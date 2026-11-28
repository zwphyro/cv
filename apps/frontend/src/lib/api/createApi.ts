import createFetchClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";

import type { paths } from "./v1";

export function createApi(baseUrl: string) {
  const fetchClient = createFetchClient<paths>({ baseUrl });
  return { fetch: fetchClient, query: createQueryClient(fetchClient) };
}
