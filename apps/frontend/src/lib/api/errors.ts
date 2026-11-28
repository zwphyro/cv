import type { components } from "./v1";

export type BackendErrorCode = components["schemas"]["ErrorCode"];

export const PROXY_ERRORS = {
  not_found: { status: 404, detail: "Not found" },
  cross_origin: { status: 403, detail: "Cross-origin requests are not allowed" },
  unsupported_media_type: { status: 415, detail: "Expected application/json" },
  payload_too_large: { status: 413, detail: "Request body is too large" },
  backend_timeout: { status: 504, detail: "Backend timed out" },
  backend_unavailable: { status: 502, detail: "Backend is unavailable" },
} as const;

export type ProxyErrorCode = keyof typeof PROXY_ERRORS;

// Will be sent by nginx once rate limiting is configured there
export type RateLimitErrorCode = "rate_limited";

export type ApiErrorCode = BackendErrorCode | ProxyErrorCode | RateLimitErrorCode;

// Network failures and non-JSON responses carry no code
export function getApiErrorCode(error: unknown): ApiErrorCode | null {
  const code = (error as { code?: unknown } | null | undefined)?.code;
  return typeof code === "string" ? (code as ApiErrorCode) : null;
}
