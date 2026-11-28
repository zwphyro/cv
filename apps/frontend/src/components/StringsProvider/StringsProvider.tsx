"use client";

import { createContext, type ReactNode, use } from "react";

import type { UiStrings } from "@/i18n/strings";

const StringsContext = createContext<UiStrings | null>(null);

interface StringsProviderProps {
  strings: UiStrings;
  children: ReactNode;
}

export function StringsProvider({ strings, children }: StringsProviderProps) {
  return <StringsContext value={strings}>{children}</StringsContext>;
}

export function useStrings() {
  const strings = use(StringsContext);
  if (!strings) {
    throw new Error("useStrings must be used inside StringsProvider");
  }
  return strings;
}
