// Analytics consent, stored per browser. Storage can be unavailable (private
// mode, blocked site data), so every access is guarded and "no answer" is the
// safe default: Clarity stays off until the visitor accepts.
export type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "lh-analytics-consent";
const CHANGE_EVENT = "lh-consent-change";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice | null) {
  try {
    if (choice) window.localStorage.setItem(STORAGE_KEY, choice);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Not persisted; the choice still applies for this page view.
  }
  memoryChoice = choice;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Fallback for when storage throws, so a click still takes effect in this tab.
let memoryChoice: ConsentChoice | null = null;

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Snapshot for useSyncExternalStore: stored choice, else the in-memory one. */
export function getConsentSnapshot(): ConsentChoice | null {
  return readConsent() ?? memoryChoice;
}

/** On the server (and during hydration) nothing is known yet. */
export function getServerConsentSnapshot(): "unknown" {
  return "unknown";
}
