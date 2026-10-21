import { useState, useEffect } from 'react';

export interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

export interface UseTypewriterResult {
  displayed: string;
  done: boolean;
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: UseTypewriterOptions): UseTypewriterResult {
  const [displayed, setDisplayed] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    setDisplayed('');
    setDone(false);

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          if (intervalId) clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
