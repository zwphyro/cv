import { NextResponse } from "next/server";

import { PROXY_ERRORS, type ProxyErrorCode } from "@/lib/api/errors";

// Same shape as the backend's ErrorResponse, so callers handle both the same way
export function proxyError(code: ProxyErrorCode) {
  const { status, detail } = PROXY_ERRORS[code];
  return NextResponse.json({ detail, code }, { status });
}
