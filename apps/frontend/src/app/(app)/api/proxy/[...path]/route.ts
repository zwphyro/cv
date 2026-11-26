import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";

import { BACKEND_TIMEOUT_MS, HOP_BY_HOP_HEADERS, MAX_BODY_BYTES, REQUEST_ONLY_HEADERS } from "./config";
import { isJson } from "./isJson";
import { isSameOrigin } from "./isSameOrigin";
import { findAllowedRoute } from "./matchRoute";
import { proxyError } from "./proxyError";
import { BodyTooLargeError, readBody } from "./readBody";

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);

function withoutHeaders(source: Headers, names: string[]) {
  const headers = new Headers(source);
  for (const name of names) headers.delete(name);
  return headers;
}

function backendUrl(segments: string[], search: string) {
  return new URL(`/${segments.map(encodeURIComponent).join("/")}${search}`, env.BACKEND_INTERNAL_URL);
}

async function forward(request: NextRequest, segments: string[], body: Blob | undefined) {
  const response = await fetch(backendUrl(segments, request.nextUrl.search), {
    method: request.method,
    headers: withoutHeaders(request.headers, [...HOP_BY_HOP_HEADERS, ...REQUEST_ONLY_HEADERS]),
    body,
    redirect: "manual",
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: withoutHeaders(response.headers, HOP_BY_HOP_HEADERS),
  });
}

async function handler(request: NextRequest, context: RouteContext<"/api/proxy/[...path]">) {
  const { path: segments } = await context.params;

  if (!findAllowedRoute(request.method, segments)) return proxyError(404, "Not found");
  if (!isSameOrigin(request)) return proxyError(403, "Cross-origin requests are not allowed");

  const hasBody = METHODS_WITH_BODY.has(request.method);
  if (hasBody && !isJson(request)) return proxyError(415, "Expected application/json");

  try {
    const body = hasBody ? await readBody(request, MAX_BODY_BYTES) : undefined;
    return await forward(request, segments, body);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return proxyError(413, "Request body is too large");
    if (error instanceof DOMException && error.name === "TimeoutError") return proxyError(504, "Backend timed out");
    return proxyError(502, "Backend is unavailable");
  }
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
