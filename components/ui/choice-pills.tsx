"use client";

import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

export function ChoicePills<T extends string>({
  options,
  value,
  onChange,
  label,
  testidPrefix,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  testidPrefix: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          data-testid={`${testidPrefix}-${option.value}`}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            value === option.value
              ? "border-emerald bg-emerald text-white shadow-md shadow-emerald/20"
              : "border-line bg-white text-obsidian/75 hover:border-emerald/50 hover:text-emerald",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
