"use client";

import { Send } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input, Label, Textarea } from "@/components/ui/form-controls";
import { focusFirstInvalid, submitLead } from "@/lib/submit";

const FIELD_ORDER = ["name", "contact", "message"];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrors({});
    const honeypot = new FormData(event.currentTarget).get("company");
    const result = await submitLead("/api/contact", { name, contact, message, company: honeypot });
    setPending(false);
    if (result.ok) {
      toast.success("Enquiry sent — Shadhiya will get back to you shortly.");
      setName("");
      setContact("");
      setMessage("");
      return;
    }
    if (result.fields) {
      setErrors(result.fields);
      focusFirstInvalid(formRef.current, result.fields, FIELD_ORDER);
      return;
    }
    toast.error("Could not send — please try WhatsApp instead.");
  }

  const invalid = (field: string) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      data-testid="contact-form"
      className="relative h-full space-y-6 rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-obsidian/5 sm:p-10"
    >
      <Honeypot />
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald">Enquiry Form</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            data-field="name"
            data-testid="contact-name-input"
            required
            maxLength={120}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            {...invalid("name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-detail">WhatsApp / Email</Label>
          <Input
            id="contact-detail"
            data-field="contact"
            data-testid="contact-detail-input"
            required
            maxLength={200}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="How do we reach you?"
            {...invalid("contact")}
          />
          <FieldError id="contact-error" message={errors.contact} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          data-field="message"
          data-testid="contact-message-input"
          required
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your goal — target band, timeline, or what you're struggling with."
          rows={6}
          {...invalid("message")}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>
      <Button type="submit" size="lg" disabled={pending} data-testid="contact-submit-btn">
        {pending ? "Sending…" : "Send Enquiry"}
        {!pending && <Send className="ml-1 h-4 w-4" />}
      </Button>
    </form>
  );
}
