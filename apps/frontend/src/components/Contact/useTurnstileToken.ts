import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

const TOKEN_TIMEOUT_MS = 30_000;

export class VerificationError extends Error { }

function createDeferred() {
  let resolve: () => void = () => undefined;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

export function useTurnstileToken() {
  const widgetRef = useRef<TurnstileInstance | null>(null);
  const [active, setActive] = useState(false);
  const [loaded] = useState(createDeferred);

  const activate = () => {
    setActive(true);
  };

  const getToken = async () => {
    setActive(true);
    await loaded.promise;
    const widget = widgetRef.current;
    if (!widget) throw new VerificationError("Turnstile is not rendered");

    try {
      widget.execute();
      return await widget.getResponsePromise(TOKEN_TIMEOUT_MS);
    } catch (error) {
      throw new VerificationError(String(error));
    }
  };

  const reset = () => {
    widgetRef.current?.reset();
  };

  return {
    active,
    activate,
    getToken,
    reset,
    widgetProps: { ref: widgetRef, onWidgetLoad: loaded.resolve },
  };
}
