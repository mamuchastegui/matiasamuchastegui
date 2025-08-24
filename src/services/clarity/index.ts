/**
 * Microsoft Clarity initialization (production-only).
 * Loads the lightweight npm bundle and starts Clarity when a project ID is provided.
 */

const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

export async function initClarity(): Promise<void> {
  if (!import.meta.env.PROD) return; // only run in production builds
  if (!CLARITY_ID) return; // skip if no project id
  if (typeof window === 'undefined') return;

  try {
    // Dynamically import to avoid affecting dev bundle
    await import('clarity-js');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).clarity?.('start', { projectId: CLARITY_ID });
  } catch {
    // Intentionally swallow errors to avoid breaking the app
  }
}

