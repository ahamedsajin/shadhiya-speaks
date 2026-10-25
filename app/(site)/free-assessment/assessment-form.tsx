"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { ChoicePills } from "@/components/ui/choice-pills";
import { FieldError, Honeypot, Input, Label } from "@/components/ui/form-controls";
import type { ClassFormat, Difficulty, Program } from "@/lib/labels";
import { whatsappLink } from "@/lib/settings";
import { focusFirstInvalid, submitLead } from "@/lib/submit";

const FIELD_ORDER = ["full_name", "whatsapp", "email", "class_format", "program", "target_band", "test_date", "difficulty"];

export function AssessmentForm({ whatsappNumber }: { whatsappNumber: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [classFormat, setClassFormat] = useState<ClassFormat>("group");
  const [program, setProgram] = useState<Program>("academic");
  const [targetBand, setTargetBand] = useState("");
  const [testDate, setTestDate] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("writing");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setErrors({});
    const honeypot = new FormData(event.currentTarget).get("company");
    const result = await submitLead("/api/assessments", {
      full_name: fullName,
      whatsapp,
      email,
      class_format: classFormat,
      program,
      target_band: targetBand || undefined,
      test_date: testDate || undefined,
      difficulty,
      company: honeypot,
    });
    setPending(false);
    if (result.ok) {
      setDone(true);
      return;
    }
    if (result.fields) {
      setErrors(result.fields);
      focusFirstInvalid(formRef.current, result.fields, FIELD_ORDER);
      return;
    }
    toast.error("Could not submit — please try again or reach us on WhatsApp.");
  }

  const programLabel =
    program === "academic" ? "Academic IELTS" : program === "general" ? "General IELTS" : "Spoken English";
  const summaryLink = whatsappLink(
    whatsappNumber,
    `Hi Shadhiya! I just booked my free assessment.\n\nName: ${fullName}\nProgram: ${programLabel}\nFormat: ${
      classFormat === "group" ? "Small Group" : "1-to-1"
    }\nTarget: ${targetBand || "Not sure yet"}\nTest date: ${testDate || "Not scheduled"}\nBiggest difficulty: ${difficulty}`,
  );

  const invalid = (name: string) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-line bg-white p-6 shadow-xl shadow-obsidian/5 sm:p-10">
      {done ? (
        <div className="py-8 text-center" data-testid="assessment-success-panel" role="status">
          <CircleCheck className="mx-auto h-14 w-14 text-emerald" />
          <h2 className="mt-5 font-heading text-3xl font-semibold text-obsidian">You&apos;re booked in.</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            Your assessment request has been received. Tap below to send your summary to Shadhiya on WhatsApp and get
            the fastest response.
          </p>
          <a
            href={summaryLink}
            target="_blank"
            rel="noreferrer"
            data-testid="assessment-whatsapp-send-btn"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 font-medium text-white transition-transform duration-300 hover:scale-105"
          >
            <WhatsAppIcon size={18} />
            Send to Shadhiya on WhatsApp
          </a>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} data-testid="assessment-form" className="relative space-y-7">
          <Honeypot />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                data-field="full_name"
                data-testid="assessment-name-input"
                required
                maxLength={120}
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                {...invalid("full_name")}
              />
              <FieldError id="full_name-error" message={errors.full_name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input
                id="whatsapp"
                data-field="whatsapp"
                data-testid="assessment-whatsapp-input"
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={30}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+971 5X XXX XXXX"
                {...invalid("whatsapp")}
              />
              <FieldError id="whatsapp-error" message={errors.whatsapp} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                data-field="email"
                type="email"
                data-testid="assessment-email-input"
                required
                maxLength={200}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                {...invalid("email")}
              />
              <FieldError id="email-error" message={errors.email} />
            </div>
            <div className="space-y-2">
              <Label>Preferred Class Format</Label>
              <ChoicePills
                label="Preferred Class Format"
                testidPrefix="assessment-format"
                value={classFormat}
                onChange={setClassFormat}
                options={[
                  { value: "group", label: "Small Group" },
                  { value: "one-to-one", label: "1-to-1" },
                ]}
              />
              <FieldError id="class_format-error" message={errors.class_format} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Program Interest</Label>
            <ChoicePills
              label="Program Interest"
              testidPrefix="assessment-program"
              value={program}
              onChange={setProgram}
              options={[
                { value: "academic", label: "Academic IELTS" },
                { value: "general", label: "General IELTS" },
                { value: "spoken", label: "Spoken English" },
              ]}
            />
            <FieldError id="program-error" message={errors.program} />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="target-band">Target Band Score / Goal</Label>
              <Input
                id="target-band"
                data-field="target_band"
                data-testid="assessment-target-input"
                maxLength={60}
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value)}
                placeholder="e.g. Band 7.5 / Fluent speech"
                {...invalid("target_band")}
              />
              <FieldError id="target_band-error" message={errors.target_band} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-date">Planned Test Date</Label>
              <Input
                id="test-date"
                data-field="test_date"
                type="date"
                data-testid="assessment-date-input"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                {...invalid("test_date")}
              />
              <FieldError id="test_date-error" message={errors.test_date} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Primary Difficulty Area</Label>
            <ChoicePills
              label="Primary Difficulty Area"
              testidPrefix="assessment-difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={[
                { value: "writing", label: "Writing" },
                { value: "speaking", label: "Speaking" },
                { value: "reading", label: "Reading" },
                { value: "listening", label: "Listening" },
              ]}
            />
            <FieldError id="difficulty-error" message={errors.difficulty} />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={pending} data-testid="assessment-submit-btn">
            {pending ? "Booking…" : "Book My Free Assessment"}
            {!pending && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </form>
      )}
    </div>
  );
}
