"use client";

import { useTimedFlag } from "@/hooks/useTimedFlag";

const COPIED_DURATION_MS = 1600;

export function TimedFlagButton() {
  const [copied, markCopied] = useTimedFlag(COPIED_DURATION_MS);

  return (
    <button
      type="button"
      onClick={markCopied}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
