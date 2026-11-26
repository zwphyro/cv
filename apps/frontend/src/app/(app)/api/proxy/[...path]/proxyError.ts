import { NextResponse } from "next/server";

// Same shape as the backend's ErrorResponse, so callers handle both the same way
export function proxyError(status: number, detail: string) {
  return NextResponse.json({ detail }, { status });
}
