import { environmentManager, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  // A server render must never share cached data with another request
  if (environmentManager.isServer()) return makeQueryClient();

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
