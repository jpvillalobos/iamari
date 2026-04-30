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

export interface EnrollmentData {
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

export type StepKey =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "review";

export const STEPS: StepKey[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "review"];

export function emptyEnrollment(): EnrollmentData {
  return {
    account: {
      email: "",
      timezone: "America/Costa_Rica",
      tier: "familia",
    },
    household: {
      familyName: "",
      members: [],
    },
    assistant: {
      name: "Ari",
      emoji: "🌙",
      vibe: 5,
      languages: ["es", "en"],
    },
    whatsapp: {
      optedInMemberIds: [],
    },
    email: {
      agentMailAddress: "",
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
      banks: [],
      school: "",
      vipSenders: [],
      archiveNewsletters: true,
      elevateUrgent: true,
    },
    routines: {
      morningCheckin: true,
      afternoonPause: false,
      nightDisconnect: false,
      examReminders: false,
      birthdayReminders: true,
      monthlyBills: true,
      birthdays: [],
    },
    personality: {
      ownerProfile: "",
      assistantSoul: "",
      voiceNotes: "",
    },
  };
}

export function newMember(): Member {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
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
    id: typeof crypto !== "undefined" && "randomUUID" in crypto
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
