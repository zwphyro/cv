import type { NextRequest } from "next/server";

export function isJson(request: NextRequest) {
  const mediaType = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return mediaType === "application/json";
}
