"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
