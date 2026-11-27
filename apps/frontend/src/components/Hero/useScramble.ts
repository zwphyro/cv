import { useState } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";

const SCRAMBLE_CHARS = "!<>-_/[]{}=+*^?#";
const DURATION_S = 0.9;

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? "";
}

const segmenter = new Intl.Segmenter();

function characters(text: string) {
  return Array.from(segmenter.segment(text), ({ segment }) => segment);
}

function scramble(text: string, progress: number) {
  const chars = characters(text);
  const letterCount = chars.filter((char) => char !== " ").length;
  let position = 0;

  return chars.map((char) => {
    if (char === " ") return char;
    const settled = progress > position / letterCount;
    position += 1;
    return settled ? char : randomChar();
  }).join("");
}

export function useScramble(text: string, enabled: boolean) {
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);

  useAnimationFrame(({ elapsed }) => {
    const progress = Math.min(1, elapsed / DURATION_S);
    setDisplay(scramble(text, progress));
    if (progress === 1) setDone(true);
  }, enabled && !done);

  return display;
}
