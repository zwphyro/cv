"use client";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { Button } from "@/components/ui/Button/Button";
import { useTimedFlag } from "@/hooks/useTimedFlag";

const COPIED_DURATION_MS = 1600;

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const { footer } = useStrings();
  const [copied, markCopied] = useTimedFlag(COPIED_DURATION_MS);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      markCopied();
    } catch {
      // Clipboard access needs HTTPS and can be denied; the address stays visible next to the button
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => void copy()}
    >
      {copied ? `✓ ${footer.copied}` : footer.copy}
    </Button>
  );
}
