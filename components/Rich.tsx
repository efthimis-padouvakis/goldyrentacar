import { Fragment, type ReactNode } from "react";

export default function Rich({ text, values }: { text: string; values: Record<string, ReactNode> }) {
  const parts = text.split(/(\{\w+\})/g);
  return (
    <>
      {parts.map((part, index) => {
        const key = part.match(/^\{(\w+)\}$/)?.[1];
        return <Fragment key={index}>{key && key in values ? values[key] : part}</Fragment>;
      })}
    </>
  );
}
