"use client";

import { Button } from "@/components/ui/Button/Button";
import { browserApi } from "@/lib/api/browserApi";

export function TestRequestButton() {
  const createRequest = browserApi.query.useMutation("post", "/api/v1/requests/");

  const send = () => {
    createRequest.mutate({
      params: { header: { "X-Captcha-Token": "dev-test-token" } },
      body: { author: "Dev playground", email: "dev@example.com", message: "Test request from /dev/api" },
    });
  };

  return (
    <div>
      <Button
        onClick={send}
        disabled={createRequest.isPending}
      >
        Send test request
      </Button>
      <p>{`Browser client: ${createRequest.status}`}</p>
      {createRequest.data ? <pre>{JSON.stringify(createRequest.data, null, 2)}</pre> : null}
      {createRequest.error ? <pre>{JSON.stringify(createRequest.error, null, 2)}</pre> : null}
    </div>
  );
}
