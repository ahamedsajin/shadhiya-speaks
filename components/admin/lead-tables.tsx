"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Mail, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-controls";
import type { LeadType } from "@/lib/filters";
import { LEAD_STATUSES, STATUS_LABELS, STATUS_STYLES, type LeadStatus } from "@/lib/labels";
import { cn } from "@/lib/utils";

type LeadMetaView = {
  id: string;
  submitted: string;
  submittedFull: string;
  name: string;
  status: LeadStatus;
  notes: string | null;
  statusUpdated: string | null;
};

export type AssessmentView = LeadMetaView & {
  whatsapp: string;
  whatsappHref: string;
  email: string;
  program: string;
  format: string;
  target: string | null;
  testDate: string | null;
  difficulty: string;
};

export type ContactView = LeadMetaView & {
  contact: string;
  contactHref: string | null;
  message: string;
};

type Column<T> = { header: string; cell: (row: T) => ReactNode; className?: string };

const th =
  "h-11 px-4 text-left align-middle font-mono text-[10px] font-medium uppercase tracking-[0.2em] whitespace-nowrap text-ink-muted";
const td = "px-4 py-3 align-middle whitespace-nowrap";
const iconButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald/10 text-emerald transition-colors hover:bg-emerald hover:text-white";
const checkbox = "h-4 w-4 cursor-pointer rounded border-input accent-emerald";

/** Sends a lead change to the API, then refreshes the dashboard data. */
function useLeadActions(type: LeadType) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function send(method: "PATCH" | "DELETE", body: Record<string, unknown>, success: string) {
    setBusy(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...body }),
      });
      const data = await response.json().catch(() => null);
      if (response.status === 401) {
        toast.error("Your session expired. Please sign in again.");
        router.push("/admin/login");
        return false;
      }
      if (!response.ok) throw new Error(data?.error && data.error !== "server" ? data.error : "");
      toast.success(success);
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  const plural = (n: number) => (n === 1 ? "1 lead" : `${n} leads`);
  return {
    busy,
    setStatus: (ids: string[], status: LeadStatus) =>
      send("PATCH", { ids, status }, ids.length === 1 ? `Marked as ${STATUS_LABELS[status]}.` : `${plural(ids.length)} marked as ${STATUS_LABELS[status]}.`),
    saveNotes: (id: string, notes: string) => send("PATCH", { ids: [id], notes }, "Notes saved."),
    remove: (ids: string[]) => send("DELETE", { ids }, `${plural(ids.length)} deleted.`),
  };
}

/** Colour-coded status picker. Shows the new value immediately while the save happens. */
function StatusSelect({
  value,
  onChange,
  disabled,
  label,
}: {
  value: LeadStatus;
  onChange: (status: LeadStatus) => Promise<boolean>;
  disabled?: boolean;
  label: string;
}) {
  const [current, setCurrent] = useState(value);
  return (
    <select
      aria-label={label}
      value={current}
      disabled={disabled}
      onChange={async (e) => {
        const next = e.target.value as LeadStatus;
        setCurrent(next);
        if (!(await onChange(next))) setCurrent(value);
      }}
      className={cn(
        "h-8 cursor-pointer rounded-full border px-3 pr-7 text-xs font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-60",
        STATUS_STYLES[current],
      )}
    >
      {LEAD_STATUSES.map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}

function ConfirmDelete({
  open,
  count,
  onOpenChange,
  onConfirm,
  busy,
}: {
  open: boolean;
  count: number;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  busy: boolean;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-white p-6 shadow-xl">
          <Dialog.Title className="font-heading text-xl font-semibold text-obsidian">
            Delete {count === 1 ? "this lead" : `${count} leads`}?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-ink-muted">
            {count === 1 ? "It" : "They"} will be removed permanently, including any notes. This can&apos;t be undone.
            Export a CSV first if you want a copy.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="outline" size="lg" disabled={busy}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              size="lg"
              className="bg-destructive text-white hover:bg-destructive/85"
              onClick={onConfirm}
              disabled={busy}
              data-testid="confirm-delete-btn"
            >
              {busy ? "Deleting…" : "Delete"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NotesEditor({ lead, onSave, busy }: { lead: LeadMetaView; onSave: (notes: string) => void; busy: boolean }) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const changed = notes.trim() !== (lead.notes ?? "").trim();
  return (
    <div className="space-y-2">
      <label htmlFor={`notes-${lead.id}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Notes (only visible to you)
      </label>
      <Textarea
        id={`notes-${lead.id}`}
        value={notes}
        maxLength={2000}
        rows={3}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="e.g. Called on Monday — interested in the June batch, call back after payday."
        className="bg-white"
        data-testid={`lead-notes-${lead.id}`}
      />
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => onSave(notes)} disabled={!changed || busy}>
          Save notes
        </Button>
        {lead.statusUpdated && <span className="text-xs text-ink-muted">Status updated {lead.statusUpdated}</span>}
      </div>
    </div>
  );
}

function LeadTable<T extends LeadMetaView>({
  type,
  rows,
  columns,
  details,
  emptyMessage,
  testId,
}: {
  type: LeadType;
  rows: T[];
  columns: Column<T>[];
  details: (row: T) => ReactNode;
  emptyMessage: string;
  testId: string;
}) {
  const actions = useLeadActions(type);
  const [open, setOpen] = useState<string | null>(null);
  const [picked, setSelected] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<string[] | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  // Only rows still on this page count as selected (after a delete or page change).
  const selected = new Set(rows.filter((r) => picked.has(r.id)).map((r) => r.id));

  const allSelected = rows.length > 0 && selected.size === rows.length;
  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = selected.size > 0 && !allSelected;
  });

  const toggle = (id: string) =>
    setSelected(() => {
      const next = new Set(selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const colSpan = columns.length + 4;
  const ignoreRowClick = (target: EventTarget) =>
    (target as HTMLElement).closest("a, button, input, select, textarea, label");

  async function confirmDelete() {
    if (!pendingDelete) return;
    if (await actions.remove(pendingDelete)) {
      setPendingDelete(null);
      setSelected(new Set());
      setOpen(null);
    }
  }

  return (
    <div data-testid={testId}>
      {selected.size > 0 && (
        <div
          className="flex flex-wrap items-center gap-3 border-b border-line bg-emerald/5 px-4 py-3"
          data-testid="bulk-actions"
        >
          <span className="text-sm font-medium text-obsidian">{selected.size} selected</span>
          <select
            aria-label="Set status for selected leads"
            value=""
            disabled={actions.busy}
            onChange={async (e) => {
              const status = e.target.value as LeadStatus;
              if (status && (await actions.setStatus([...selected], status))) setSelected(new Set());
            }}
            className="h-8 cursor-pointer rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            data-testid="bulk-status-select"
          >
            <option value="" disabled>
              Set status…
            </option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setPendingDelete([...selected])}
            disabled={actions.busy}
            data-testid="bulk-delete-btn"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="ghost" className="gap-1 text-ink-muted" onClick={() => setSelected(new Set())}>
            <X className="h-4 w-4" />
            Clear selection
          </Button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-line">
            <tr>
              <th className={cn(th, "w-10 pr-0")}>
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  className={checkbox}
                  aria-label="Select all leads on this page"
                  checked={allSelected}
                  disabled={rows.length === 0}
                  onChange={() => setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))}
                />
              </th>
              {columns.map((column) => (
                <th key={column.header} className={th}>
                  {column.header}
                </th>
              ))}
              <th className={th}>Status</th>
              <th className={th}>
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="py-12 text-center text-ink-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const isOpen = open === row.id;
                return (
                  <Fragment key={row.id}>
                    <tr
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onClick={(e) => !ignoreRowClick(e.target) && setOpen(isOpen ? null : row.id)}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpen(isOpen ? null : row.id);
                        }
                      }}
                      className={cn(
                        "cursor-pointer border-b border-line transition-colors hover:bg-sand/50 focus-visible:bg-sand/50 focus-visible:outline-none",
                        (isOpen || selected.has(row.id)) && "bg-sand/50",
                      )}
                    >
                      <td className={cn(td, "w-10 pr-0")}>
                        <input
                          type="checkbox"
                          className={checkbox}
                          aria-label={`Select ${row.name}`}
                          checked={selected.has(row.id)}
                          onChange={() => toggle(row.id)}
                        />
                      </td>
                      {columns.map((column) => (
                        <td key={column.header} className={cn(td, column.className)}>
                          {column.cell(row)}
                        </td>
                      ))}
                      <td className={td}>
                        <StatusSelect
                          key={row.status}
                          value={row.status}
                          label={`Status for ${row.name}`}
                          disabled={actions.busy}
                          onChange={(status) => actions.setStatus([row.id], status)}
                        />
                      </td>
                      <td className={cn(td, "w-8")}>
                        <ChevronDown
                          className={cn("h-4 w-4 text-ink-muted transition-transform", isOpen && "rotate-180")}
                        />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-b border-line bg-sand/30">
                        <td colSpan={colSpan} className="px-4 py-5">
                          {details(row)}
                          <div className="mt-5 grid grid-cols-1 gap-5 border-t border-line pt-5 lg:grid-cols-[1fr_auto]">
                            <NotesEditor
                              key={row.notes ?? ""}
                              lead={row}
                              busy={actions.busy}
                              onSave={(notes) => actions.saveNotes(row.id, notes)}
                            />
                            <div className="flex items-end">
                              <Button
                                variant="outline"
                                className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => setPendingDelete([row.id])}
                                disabled={actions.busy}
                                data-testid={`delete-lead-${row.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete lead
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        open={pendingDelete !== null}
        count={pendingDelete?.length ?? 0}
        onOpenChange={(value) => !value && setPendingDelete(null)}
        onConfirm={confirmDelete}
        busy={actions.busy}
      />
    </div>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">{label}</dt>
      <dd className="mt-1 break-words text-sm text-obsidian">{children}</dd>
    </div>
  );
}

const assessmentColumns: Column<AssessmentView>[] = [
  { header: "Submitted", cell: (r) => r.submitted },
  { header: "Name", cell: (r) => r.name, className: "font-medium text-obsidian" },
  { header: "Program", cell: (r) => r.program },
  { header: "Format", cell: (r) => r.format },
  { header: "Target", cell: (r) => r.target ?? "—", className: "max-w-[12rem] truncate" },
  { header: "Test date", cell: (r) => r.testDate ?? "—" },
  { header: "Difficulty", cell: (r) => r.difficulty },
  {
    header: "Contact",
    cell: (r) => (
      <div className="flex gap-2">
        <a
          href={r.whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`WhatsApp ${r.name}`}
          data-testid={`admin-lead-whatsapp-${r.id}`}
          className={iconButton}
        >
          <WhatsAppIcon size={14} />
        </a>
        <a href={`mailto:${r.email}`} aria-label={`Email ${r.name}`} className={iconButton}>
          <Mail className="h-3.5 w-3.5" />
        </a>
      </div>
    ),
  },
];

export function AssessmentsTable({ rows, emptyMessage }: { rows: AssessmentView[]; emptyMessage: string }) {
  return (
    <LeadTable
      type="assessments"
      rows={rows}
      columns={assessmentColumns}
      emptyMessage={emptyMessage}
      testId="admin-assessments-table"
      details={(row) => (
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Detail label="Submitted">{row.submittedFull}</Detail>
          <Detail label="Full name">{row.name}</Detail>
          <Detail label="WhatsApp">{row.whatsapp}</Detail>
          <Detail label="Email">{row.email}</Detail>
          <Detail label="Program">{row.program}</Detail>
          <Detail label="Class format">{row.format}</Detail>
          <Detail label="Target band / goal">{row.target ?? "—"}</Detail>
          <Detail label="Planned test date">{row.testDate ?? "—"}</Detail>
          <Detail label="Primary difficulty">{row.difficulty}</Detail>
        </dl>
      )}
    />
  );
}

const contactColumns: Column<ContactView>[] = [
  { header: "Submitted", cell: (r) => r.submitted },
  { header: "Name", cell: (r) => r.name, className: "font-medium text-obsidian" },
  {
    header: "Contact",
    cell: (r) =>
      r.contactHref ? (
        <a
          href={r.contactHref}
          target={r.contactHref.startsWith("https:") ? "_blank" : undefined}
          rel="noreferrer"
          className="text-emerald underline-offset-4 hover:underline"
        >
          {r.contact}
        </a>
      ) : (
        r.contact
      ),
  },
  { header: "Message", cell: (r) => r.message, className: "max-w-md truncate" },
];

export function ContactsTable({ rows, emptyMessage }: { rows: ContactView[]; emptyMessage: string }) {
  return (
    <LeadTable
      type="contacts"
      rows={rows}
      columns={contactColumns}
      emptyMessage={emptyMessage}
      testId="admin-contacts-table"
      details={(row) => (
        <>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Detail label="Submitted">{row.submittedFull}</Detail>
            <Detail label="Name">{row.name}</Detail>
            <Detail label="Contact">{row.contact}</Detail>
          </dl>
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">Message</p>
            <p className="mt-1 max-w-3xl whitespace-pre-wrap break-words text-sm leading-relaxed text-obsidian">
              {row.message}
            </p>
          </div>
        </>
      )}
    />
  );
}
