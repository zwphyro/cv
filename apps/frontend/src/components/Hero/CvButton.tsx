"use client";

import type { MouseEvent } from "react";

import { useStrings } from "@/components/StringsProvider/StringsProvider";
import { ButtonLink } from "@/components/ui/Button/ButtonLink";
import { TextBar } from "@/components/ui/TextBar/TextBar";
import type { CvFile } from "@/lib/cvFile";

import styles from "./CvButton.module.scss";
import { useFileDownload } from "./useFileDownload";

const BAR_CELLS = 10;

interface CvButtonProps {
  file: CvFile;
  className?: string;
}

export function CvButton({ file, className }: CvButtonProps) {
  const { hero } = useStrings();
  const { state, start } = useFileDownload(file);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (state.status !== "loading") void start();
  };

  return (
    <ButtonLink
      href={file.url}
      download={file.filename}
      variant="ghost"
      aria-busy={state.status === "loading"}
      className={className}
      onClick={handleClick}
    >
      {state.status === "idle" ? hero.downloadCv : null}
      {state.status === "loading" ? (
        <>
          {hero.preparingCv}
          <TextBar
            cells={state.progress * BAR_CELLS}
            total={BAR_CELLS}
            track="strong"
          />
        </>
      ) : null}
      {state.status === "done" ? (
        <>
          <span
            aria-hidden="true"
            className={styles.check}
          >
            ✓
          </span>
          {hero.cvDownloaded}
        </>
      ) : null}
    </ButtonLink>
  );
}
