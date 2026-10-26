"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and slides content in when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Heading whose lines slide up one after another. */
export function AnimatedHeading({
  lines,
  className,
  lineClassName,
  delay = 0.1,
  as: Tag = "div",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-0.5">
          <motion.span
            className={lineClassName ? `block ${lineClassName}` : "block"}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.14, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Endless strip of credentials, paused on hover. */
export function Marquee({ items }: { items: string[] }) {
  // Short lists are repeated so one copy of the strip is always wider than the screen.
  const filled = items.length >= 7 ? items : Array.from({ length: Math.ceil(7 / items.length) }, () => items).flat();
  const strip = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {filled.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-mono text-xs uppercase tracking-[0.22em] text-obsidian/70 sm:text-sm">{item}</span>
          <span className="text-gold">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div data-testid="credentials-marquee" className="overflow-hidden border-y border-obsidian/10 bg-sand/70 py-4">
      <div className="marquee-track flex w-max">{[strip("a"), strip("b")]}</div>
    </div>
  );
}
