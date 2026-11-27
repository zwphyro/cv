import { useState } from "react";

import type { CvFile } from "@/lib/cvFile";

type DownloadState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "done" };

function saveAs(href: string, filename: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
}

async function readWithProgress(response: Response, onProgress: (progress: number) => void) {
  const total = Number(response.headers.get("content-length")) || 0;
  const reader = response.body?.getReader();
  if (!reader) return response.blob();

  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let received = 0;
  for (let result = await reader.read(); !result.done; result = await reader.read()) {
    chunks.push(new Uint8Array(result.value));
    received += result.value.byteLength;
    if (total) onProgress(Math.min(1, received / total));
  }
  return new Blob(chunks, { type: response.headers.get("content-type") ?? undefined });
}

export function useFileDownload({ url, filename }: CvFile) {
  const [state, setState] = useState<DownloadState>({ status: "idle" });

  const start = async () => {
    setState({ status: "loading", progress: 0 });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Download failed with ${String(response.status)}`);

      const blob = await readWithProgress(response, (progress) => {
        setState({ status: "loading", progress });
      });
      const href = URL.createObjectURL(blob);
      saveAs(href, filename);
      setTimeout(() => {
        URL.revokeObjectURL(href);
      });
      setState({ status: "done" });
    } catch {
      setState({ status: "idle" });
      saveAs(url, filename);
    }
  };

  return { state, start };
}
