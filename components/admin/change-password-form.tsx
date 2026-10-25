"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form-controls";

type Field = "currentPassword" | "newPassword" | "confirmPassword";

const FIELDS: { name: Field; label: string; autoComplete: string }[] = [
  { name: "currentPassword", label: "Current password", autoComplete: "current-password" },
  { name: "newPassword", label: "New password", autoComplete: "new-password" },
  { name: "confirmPassword", label: "Confirm new password", autoComplete: "new-password" },
];

export function ChangePasswordForm({ minLength }: { minLength: number }) {
  const router = useRouter();
  const empty = { currentPassword: "", newPassword: "", confirmPassword: "" };
  const [values, setValues] = useState<Record<Field, string>>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const local: Partial<Record<Field, string>> = {};
    if (values.newPassword.length < minLength) local.newPassword = `Use at least ${minLength} characters`;
    if (values.confirmPassword !== values.newPassword) local.confirmPassword = "Passwords don't match";
    if (Object.keys(local).length) {
      setErrors(local);
      return;
    }

    setPending(true);
    setErrors({});
    try {
      const response = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => null);
      if (response.status === 401) {
        toast.error("Your session expired. Please sign in again.");
        router.push("/admin/login?next=/admin/account");
        return;
      }
      if (response.status === 400 && data?.fields) {
        setErrors(data.fields);
        return;
      }
      if (!response.ok) throw new Error();
      setValues(empty);
      toast.success("Password changed. Any other devices have been signed out.");
    } catch {
      toast.error("Could not change the password. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" data-testid="change-password-form">
      {FIELDS.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            type={show ? "text" : "password"}
            autoComplete={field.autoComplete}
            required
            maxLength={200}
            value={values[field.name]}
            onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            className="h-10"
          />
          {field.name === "newPassword" && !errors.newPassword && (
            <p className="text-xs text-ink-muted">At least {minLength} characters.</p>
          )}
          <FieldError id={`${field.name}-error`} message={errors[field.name]} />
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={pending} data-testid="change-password-btn">
          {pending ? "Saving…" : "Change password"}
        </Button>
        <Button type="button" variant="ghost" size="lg" className="gap-1.5 text-ink-muted" onClick={() => setShow((s) => !s)}>
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {show ? "Hide passwords" : "Show passwords"}
        </Button>
      </div>
    </form>
  );
}
