import {
  Award,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Mic,
  MonitorSmartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { FactIcon } from "@/lib/settings";

/** Icons the admin can pick for the About page "At a Glance" cards. */
export const FACT_ICON_OPTIONS: Record<FactIcon, { icon: LucideIcon; label: string }> = {
  award: { icon: Award, label: "Award" },
  graduation: { icon: GraduationCap, label: "Graduation cap" },
  book: { icon: BookOpen, label: "Book" },
  clipboard: { icon: ClipboardCheck, label: "Clipboard" },
  monitor: { icon: MonitorSmartphone, label: "Devices" },
  check: { icon: BadgeCheck, label: "Check badge" },
  users: { icon: Users, label: "People" },
  mic: { icon: Mic, label: "Microphone" },
};
