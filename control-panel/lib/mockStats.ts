import { ActivityItem, UsageStats } from "./types";

function isoMinus(days: number, hours = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

const ACTIVITY_30D: ActivityItem[] = [
  { id: "a1", kind: "email_triage", at: isoMinus(0, 1), member: "JP", summary: "Flagged 2 BAC card alerts; archived 14 newsletters" },
  { id: "a2", kind: "routine", at: isoMinus(0, 4), summary: "Morning check-in sent to JP, Taty, Cami" },
  { id: "a3", kind: "whatsapp_received", at: isoMinus(0, 5), member: "Cami", summary: "Voice note transcribed: \"Mami salgo del cole a las 4\"" },
  { id: "a4", kind: "rule_match", at: isoMinus(1, 2), member: "JP", summary: "VIP sender doctor.ramirez@clinica.cr → escalated to WhatsApp" },
  { id: "a5", kind: "skill", at: isoMinus(1, 6), summary: "Weather: severe-rain alert dispatched (San José)" },
  { id: "a6", kind: "routine", at: isoMinus(1, 12), summary: "Night disconnect: tomorrow's brief sent" },
  { id: "a7", kind: "email_triage", at: isoMinus(2, 3), summary: "Colegio Metodista: payment reminder routed to Taty" },
  { id: "a8", kind: "skill", at: isoMinus(2, 9), summary: "OCR: receipt from MásxMenos categorized → groceries" },
  { id: "a9", kind: "routine", at: isoMinus(3, 1), summary: "Birthday reminder: Abuela María (today)" },
  { id: "a10", kind: "whatsapp_sent", at: isoMinus(3, 4), member: "Taty", summary: "Calendar nudge: dentist 4pm" },
  { id: "a11", kind: "rule_match", at: isoMinus(4, 2), summary: "BAC: card transaction $84.50 — flagged for review" },
  { id: "a12", kind: "email_triage", at: isoMinus(4, 8), summary: "Archived 22 newsletters, summarized 3 bank statements" },
  { id: "a13", kind: "skill", at: isoMinus(5, 3), summary: "Voice transcription: 4 notes processed" },
  { id: "a14", kind: "routine", at: isoMinus(5, 11), summary: "Morning check-in: 3 calendar items, mild weather" },
  { id: "a15", kind: "rule_match", at: isoMinus(6, 1), member: "Cami", summary: "School urgent: exam-week schedule changed" },
];

function nextResetISO(): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export const STATS_7D: UsageStats = {
  range: "7d",
  messagesSent: 47,
  messagesReceived: 32,
  emailsTriaged: 218,
  emailsArchived: 156,
  routinesTriggered: 18,
  skillInvocations: {
    emailTriage: 218,
    weather: 7,
    voiceTranscription: 14,
    imageOcr: 6,
    browserAutomation: 0,
    calendar: 12,
  },
  tokensUsed: 412_300,
  tokensLimit: 2_000_000,
  nextResetISO: nextResetISO(),
  recentActivity: ACTIVITY_30D.slice(0, 8),
};

export const STATS_30D: UsageStats = {
  range: "30d",
  messagesSent: 198,
  messagesReceived: 142,
  emailsTriaged: 934,
  emailsArchived: 681,
  routinesTriggered: 78,
  skillInvocations: {
    emailTriage: 934,
    weather: 30,
    voiceTranscription: 62,
    imageOcr: 24,
    browserAutomation: 3,
    calendar: 51,
  },
  tokensUsed: 1_268_400,
  tokensLimit: 2_000_000,
  nextResetISO: nextResetISO(),
  recentActivity: ACTIVITY_30D,
};

export function getStats(range: "7d" | "30d"): UsageStats {
  return range === "7d" ? STATS_7D : STATS_30D;
}
