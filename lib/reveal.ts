/** On phones, scroll a field up to just below the sticky header so the popover that opens under it is on screen. Pair with a `scroll-mt-*` class. */
export function revealOnSmallScreens(element: HTMLElement | null) {
  if (!element || !window.matchMedia("(max-width: 767px)").matches) return;
  requestAnimationFrame(() => element.scrollIntoView({ behavior: "smooth", block: "start" }));
}
