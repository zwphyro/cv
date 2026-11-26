import type { OperationId } from "./routes.generated";

export const DENYLIST: readonly OperationId[] = [
  "list_requests",
  "get_request",
  "replace_request",
  "update_request",
  "delete_request",
];

export const MAX_BODY_BYTES = 16 * 1024;

export const BACKEND_TIMEOUT_MS = 10_000;

export const HOP_BY_HOP_HEADERS = [
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "transfer-encoding",
];

export const REQUEST_ONLY_HEADERS = [
  "host",
  "cookie",
  "authorization",
];
