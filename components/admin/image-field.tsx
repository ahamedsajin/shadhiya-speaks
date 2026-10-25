"use client";

import { ImageUp, Link2, RotateCcw, Trash2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form-controls";
import { uploadImage, type ImageKind } from "@/lib/image-upload";
import { cn } from "@/lib/utils";

const ACCEPT: Record<ImageKind, string> = {
  photo: "image/jpeg,image/png,image/webp,image/avif,image/gif",
  logo: "image/png,image/svg+xml,image/webp,image/jpeg",
  favicon: "image/png,image/svg+xml,image/x-icon,.ico",
};

/**
 * One editable image: preview, upload from device, paste a URL, and reset.
 * `fallback` is what the site shows when the value is empty (null).
 */
export function ImageField({
  label,
  hint,
  kind,
  value,
  defaultValue,
  onChange,
  alt,
  onAltChange,
  previewClassName,
  error,
  altError,
  testId,
}: {
  label: string;
  hint?: string;
  kind: ImageKind;
  value: string | null;
  defaultValue: string | null;
  onChange: (value: string | null) => void;
  alt?: string;
  onAltChange?: (value: string) => void;
  previewClassName?: string;
  error?: string;
  altError?: string;
  testId: string;
}) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [url, setUrl] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadImage(file, kind));
      toast.success(`${label} uploaded — remember to save.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function applyUrl() {
    const trimmed = url.trim();
    if (!/^https:\/\/\S+$/.test(trimmed)) {
      toast.error("Paste a full image link starting with https://");
      return;
    }
    onChange(trimmed);
    setUrl("");
    setShowUrl(false);
  }

  const isDefault = value === defaultValue;
  const optional = defaultValue === null;

  return (
    <div className="space-y-3" data-testid={testId}>
      <div>
        <Label>{label}</Label>
        {hint && <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{hint}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-[repeating-conic-gradient(#f3ede2_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]",
            previewClassName ?? "h-28 w-28",
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary upload or URL
            <img
              src={value}
              alt=""
              className={cn("h-full w-full", kind === "photo" ? "object-cover" : "object-contain p-2")}
            />
          ) : (
            <span className="px-3 text-center text-xs text-ink-muted">
              {kind === "favicon" ? "Default icon" : "Text logo"}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPT[kind]}
              className="sr-only"
              id={`${id}-file`}
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            <Button
              type="button"
              variant="outline"
              className="gap-1.5"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              data-testid={`${testId}-upload`}
            >
              <ImageUp className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload from device"}
            </Button>
            <Button type="button" variant="outline" className="gap-1.5" onClick={() => setShowUrl((v) => !v)}>
              <Link2 className="h-4 w-4" />
              Use image URL
            </Button>
            {!isDefault && (
              <Button
                type="button"
                variant="ghost"
                className="gap-1.5 text-ink-muted"
                onClick={() => onChange(defaultValue)}
              >
                {optional ? <Trash2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                {optional ? "Remove" : "Reset to original"}
              </Button>
            )}
          </div>

          {showUrl && (
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    applyUrl();
                  }
                }}
                placeholder="https://…"
                aria-label={`${label} URL`}
                className="h-8"
              />
              <Button type="button" onClick={applyUrl}>
                Apply
              </Button>
            </div>
          )}

          {onAltChange && (
            <div className="space-y-1.5">
              <Label htmlFor={`${id}-alt`} className="text-xs text-ink-muted">
                Description (for screen readers and Google)
              </Label>
              <Input
                id={`${id}-alt`}
                value={alt ?? ""}
                maxLength={200}
                onChange={(e) => onAltChange(e.target.value)}
                aria-invalid={altError ? true : undefined}
              />
              <FieldError id={`${id}-alt-error`} message={altError} />
            </div>
          )}
          <FieldError id={`${id}-error`} message={error} />
        </div>
      </div>
    </div>
  );
}
