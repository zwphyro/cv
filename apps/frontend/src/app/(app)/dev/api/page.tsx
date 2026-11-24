import { notFound } from "next/navigation";

import { ServerRequestCount } from "./ServerRequestCount";
import { TestRequestButton } from "./TestRequestButton";

export default function ApiPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main>
      <h1>API clients</h1>
      <ServerRequestCount />
      <TestRequestButton />
    </main>
  );
}
