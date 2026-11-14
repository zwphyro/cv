"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { useTimedFlag } from "@/hooks/useTimedFlag";

const COPIED_DURATION_MS = 1600;

export function TimedFlagButton() {
  const { footer } = useStrings();
  const [copied, markCopied] = useTimedFlag(COPIED_DURATION_MS);

  return (
    <button
      type="button"
      onClick={markCopied}
    >
      {copied ? `✓ ${footer.copied}` : footer.copy}
    </button>
  );
}
