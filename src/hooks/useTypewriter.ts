import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  isComplete: boolean;
}

export const useTypewriter = (
  text: string,
  options: UseTypewriterOptions = {}
): UseTypewriterReturn => {
  const { speed = 30, delay = 0, onComplete } = options;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset states when text changes
    setDisplayText('');
    setIsTyping(false);
    setIsComplete(false);

    // Clear any existing intervals/timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!text) return;

    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          // Typing complete
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, onComplete]);

  return {
    displayText,
    isTyping,
    isComplete
  };
};

export default useTypewriter;