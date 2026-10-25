import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">404</p>
      <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-obsidian sm:text-5xl">
        Page not <span className="italic text-emerald">found</span>
      </h1>
      <p className="mt-4 max-w-md text-ink-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
        Back to Home
      </Link>
    </main>
  );
}
