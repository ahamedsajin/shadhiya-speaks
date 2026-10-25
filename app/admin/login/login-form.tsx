"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-controls";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error && data.error !== "validation" ? data.error : "Login failed");
      }
      router.replace(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[2rem] border border-line bg-white p-8 shadow-xl shadow-obsidian/5"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Admin</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-obsidian">Leads Dashboard</h1>
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin-email">Email</Label>
        <Input
          id="admin-email"
          type="email"
          data-testid="admin-email-input"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@shadhiyaspeaks.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <Input
          id="admin-password"
          type="password"
          data-testid="admin-password-input"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive" data-testid="admin-login-error" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={pending} data-testid="admin-login-btn">
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
