"use client";

/**
 * Shared state for the fullscreen logo intro.
 *
 * The intro is a ~15s video, so it must play at most once per browser session.
 * Two consumers need to agree on that: LogoIntro (which plays and dismisses it)
 * and ContentReveal (which un-hides the page once it is gone).
 *
 * The `intro:done` event alone is not enough — LogoIntro's effect commits before
 * ContentReveal's, so a synchronous skip (reduced motion, or intro already seen)
 * dispatches the event before ContentReveal has subscribed. The module-level flag
 * below closes that gap; the event stays for the async case.
 */

const SESSION_KEY = "mannfleet_intro_seen";

let done = false;

export function isIntroDone() {
  return done;
}

/** Server render: the intro has never played. */
export function isIntroDoneOnServer() {
  return false;
}

export function subscribeToIntro(onChange: () => void) {
  window.addEventListener("intro:done", onChange);
  return () => window.removeEventListener("intro:done", onChange);
}

/** True when the intro has already played in this browser session. */
export function hasSeenIntroThisSession() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroDone() {
  if (done) return;
  done = true;
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode — intro simply replays next navigation */
  }
  window.dispatchEvent(new CustomEvent("intro:done"));
}
