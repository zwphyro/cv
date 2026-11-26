import { DENYLIST } from "./config";
import { ROUTES } from "./routes.generated";

const PARAM_SEGMENT = /^\{\w+\}$/;

// A parameter value must stay a single segment, otherwise the backend would resolve a different path
function isSafeSegment(segment: string) {
  return segment !== "" && segment !== "." && segment !== ".." && !/[/\\]/.test(segment);
}

function pathMatches(template: string, segments: string[]) {
  const templateSegments = template.split("/").filter(Boolean);
  if (templateSegments.length !== segments.length) return false;

  return templateSegments.every((part, index) => {
    const segment = segments[index] ?? "";
    return PARAM_SEGMENT.test(part) ? isSafeSegment(segment) : part === segment;
  });
}

export function findAllowedRoute(method: string, segments: string[]) {
  const route = ROUTES.find((candidate) => candidate.method === method && pathMatches(candidate.path, segments));
  return route && !DENYLIST.includes(route.operationId) ? route : undefined;
}
