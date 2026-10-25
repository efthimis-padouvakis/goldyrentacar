import { CheckIcon } from "@/components/icons";

export default function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} className="flex min-w-0 items-center gap-2 sm:gap-3" aria-current={active ? "step" : undefined}>
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold sm:size-7 sm:text-xs ${
                done ? "bg-sea-600 text-white" : active ? "bg-gold-400 text-sea-950" : "bg-sand-200 text-ink/50"
              }`}
            >
              {done ? <CheckIcon /> : index + 1}
            </span>
            <span className={`truncate ${active ? "text-ink" : done ? "text-ink/70" : "text-ink/40"} ${active ? "" : "max-sm:hidden"}`}>{step}</span>
            {index < steps.length - 1 && <span aria-hidden="true" className={`h-px w-4 shrink-0 sm:w-10 ${done ? "bg-sea-600" : "bg-sand-300"}`} />}
          </li>
        );
      })}
    </ol>
  );
}
