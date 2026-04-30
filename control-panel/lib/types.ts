export type Lang = "es" | "en" | "both";

export type Role = "owner" | "adult" | "child";

export type Tier = "essential" | "familia" | "familia_plus";

export interface Member {
  id: string;
  name: string;
  nickname?: string;
  role: Role;
  phone: string;
  language: Lang;
}

export interface Birthday {
  id: string;
  name: string;
  date: string;
}

export interface AriConfig {
  account: {
    email: string;
    timezone: string;
    tier: Tier;
  };
  household: {
    familyName: string;
    members: Member[];
  };
  assistant: {
    name: string;
    emoji: string;
    vibe: number;
    languages: ("es" | "en")[];
  };
  whatsapp: {
    optedInMemberIds: string[];
  };
  email: {
    agentMailAddress: string;
    forwardingPlanned: boolean;
    skipped: boolean;
  };
  skills: {
    emailTriage: boolean;
    weather: boolean;
    voiceTranscription: boolean;
    imageOcr: boolean;
    browserAutomation: boolean;
    calendar: boolean;
  };
  rulePacks: {
    banks: string[];
    school: string;
    vipSenders: string[];
    archiveNewsletters: boolean;
    elevateUrgent: boolean;
  };
  routines: {
    morningCheckin: boolean;
    afternoonPause: boolean;
    nightDisconnect: boolean;
    examReminders: boolean;
    birthdayReminders: boolean;
    monthlyBills: boolean;
    birthdays: Birthday[];
  };
  personality: {
    ownerProfile: string;
    assistantSoul: string;
    voiceNotes: string;
  };
}

export type ActivityKind =
  | "email_triage"
  | "whatsapp_sent"
  | "whatsapp_received"
  | "routine"
  | "skill"
  | "rule_match";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  at: string; // ISO datetime
  member?: string; // who it concerns
  summary: string;
}

export interface UsageStats {
  range: "7d" | "30d";
  messagesSent: number;
  messagesReceived: number;
  emailsTriaged: number;
  emailsArchived: number;
  routinesTriggered: number;
  skillInvocations: {
    emailTriage: number;
    weather: number;
    voiceTranscription: number;
    imageOcr: number;
    browserAutomation: number;
    calendar: number;
  };
  tokensUsed: number;
  tokensLimit: number;
  nextResetISO: string;
  recentActivity: ActivityItem[];
}

export interface PlanInfo {
  tier: Tier;
  maxMembers: number; // -1 = unlimited
  monthlyTokens: number;
  priceUsd: number;
  features: string[];
}

export interface Session {
  email: string;
  loggedInAt: string;
}

export function newMember(): Member {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `m_${Math.random().toString(36).slice(2, 10)}`,
    name: "",
    nickname: "",
    role: "adult",
    phone: "",
    language: "es",
  };
}

export function newBirthday(): Birthday {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `b_${Math.random().toString(36).slice(2, 10)}`,
    name: "",
    date: "",
  };
}

export function slugifyFamilyName(family: string): string {
  return family
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
}

export const PLANS: Record<Tier, PlanInfo> = {
  essential: {
    tier: "essential",
    maxMembers: 3,
    monthlyTokens: 500_000,
    priceUsd: 9,
    features: [
      "1 admin",
      "Up to 3 family members",
      "Email triage",
      "WhatsApp delivery",
      "1 routine",
    ],
  },
  familia: {
    tier: "familia",
    maxMembers: 6,
    monthlyTokens: 2_000_000,
    priceUsd: 19,
    features: [
      "Up to 6 family members",
      "All skills",
      "Full routines",
      "Custom rule packs",
      "Birthday & exam reminders",
    ],
  },
  familia_plus: {
    tier: "familia_plus",
    maxMembers: -1,
    monthlyTokens: 6_000_000,
    priceUsd: 39,
    features: [
      "Unlimited members",
      "Custom skills & rule packs",
      "Browser automation included",
      "Priority support",
      "Early access to new features",
    ],
  },
};

export function demoConfig(): AriConfig {
  const jpId = "m_jp";
  const tatyId = "m_taty";
  const camiId = "m_cami";
  const matiId = "m_mati";
  return {
    account: {
      email: "jp@iamari.co",
      timezone: "America/Costa_Rica",
      tier: "familia",
    },
    household: {
      familyName: "Villalobos Hincapié",
      members: [
        { id: jpId, name: "Juan Pablo", nickname: "JP", role: "owner", phone: "+50688889999", language: "es" },
        { id: tatyId, name: "Tatiana", nickname: "Taty", role: "adult", phone: "+50688887777", language: "es" },
        { id: camiId, name: "Camila", nickname: "Cami", role: "child", phone: "+50688886666", language: "both" },
        { id: matiId, name: "Mateo", nickname: "Mati", role: "child", phone: "+50688885555", language: "es" },
      ],
    },
    assistant: {
      name: "Ari",
      emoji: "🌙",
      vibe: 6,
      languages: ["es", "en"],
    },
    whatsapp: {
      optedInMemberIds: [jpId, tatyId, camiId],
    },
    email: {
      agentMailAddress: "villaloboshincapie@agentmail.to",
      forwardingPlanned: true,
      skipped: false,
    },
    skills: {
      emailTriage: true,
      weather: true,
      voiceTranscription: true,
      imageOcr: true,
      browserAutomation: false,
      calendar: true,
    },
    rulePacks: {
      banks: ["BAC", "Davivienda", "Promerica"],
      school: "Colegio Metodista",
      vipSenders: ["abuela@gmail.com", "doctor.ramirez@clinica.cr"],
      archiveNewsletters: true,
      elevateUrgent: true,
    },
    routines: {
      morningCheckin: true,
      afternoonPause: false,
      nightDisconnect: true,
      examReminders: true,
      birthdayReminders: true,
      monthlyBills: true,
      birthdays: [
        { id: "b_1", name: "Abuela María", date: "1948-03-12" },
        { id: "b_2", name: "Cami", date: "2014-07-22" },
        { id: "b_3", name: "Mati", date: "2017-11-04" },
      ],
    },
    personality: {
      ownerProfile:
        "Cloud architect, runs his own family OS. Two young kids, partner is a teacher. Values directness — no corporate filler. Bilingual household, ES dominant.",
      assistantSoul:
        "Direct, opinionated, never apologizes for taking initiative. Knows it's a guest in the house. Skips greetings. Treats the family like real people, not users.",
      voiceNotes:
        "JP wants no preamble. Taty prefers full sentences and gentle tone. Cami uses a lot of slang and emoji. Mati is still learning to read — keep messages to him simple.",
    },
  };
}
