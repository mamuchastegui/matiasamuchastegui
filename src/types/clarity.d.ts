declare global {
  interface Window {
    // Minimal typing for Clarity's global function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity?: (method: string, ...args: any[]) => void;
  }
}

export {};

