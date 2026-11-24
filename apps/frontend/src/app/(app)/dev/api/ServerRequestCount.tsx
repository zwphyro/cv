import { connection } from "next/server";

import { serverApi } from "@/lib/api/serverApi";

export async function ServerRequestCount() {
  await connection();

  const { data, response } = await serverApi.fetch.GET("/api/v1/requests/");
  if (!data) return <p>{`Server client failed with ${String(response.status)}`}</p>;

  return <p>{`Server client: ${String(data.length)} requests in the backend`}</p>;
}
