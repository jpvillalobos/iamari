"use client";

import { useState, ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { EnrollmentData } from "@/lib/types";
import { Button, StepCard, StepHeader } from "../ui";

export default function StepReview({
  data,
  onEdit,
}: {
  data: EnrollmentData;
  onEdit: (stepIdx: number) => void;
}) {
  const { t } = useLang();
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(data, null, 2);

  const copy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const download = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = new Date().toISOString().slice(0, 10);
    a.download = `ari-enrollment-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const skillsOn = Object.values(data.skills).filter(Boolean).length;
  const routinesOn = (Object.entries(data.routines).filter(
    ([k, v]) => k !== "birthdays" && v === true,
  ) as [string, boolean][]).length;

  return (
    <StepCard>
      <StepHeader
        kicker={t("review.kicker")}
        title={t("review.title")}
        subtitle={t("review.subtitle")}
      />

      <div className="grid gap-3">
        <Row
          title={t("review.summary.account")}
          editIdx={0}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{data.account.email || "—"}</div>
          <div className="text-text-muted">
            {data.account.timezone} · {data.account.tier}
          </div>
        </Row>

        <Row
          title={t("review.summary.household")}
          editIdx={1}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{data.household.familyName || "—"}</div>
          <div className="text-text-muted">
            {t("review.memberCount", { count: data.household.members.length })}
          </div>
        </Row>

        <Row
          title={t("review.summary.assistant")}
          editIdx={2}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>
            {data.assistant.emoji} {data.assistant.name || "—"}
          </div>
          <div className="text-text-muted">
            {data.assistant.languages.join(" · ").toUpperCase()} · vibe {data.assistant.vibe}/10
          </div>
        </Row>

        <Row
          title={t("review.summary.whatsapp")}
          editIdx={3}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{data.whatsapp.optedInMemberIds.length} opted in</div>
        </Row>

        <Row
          title={t("review.summary.email")}
          editIdx={4}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{data.email.skipped ? "—" : data.email.agentMailAddress || "—"}</div>
        </Row>

        <Row
          title={t("review.summary.skills")}
          editIdx={5}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{t("review.skillCount", { count: skillsOn })}</div>
          <div className="text-text-muted text-xs">
            {Object.entries(data.skills)
              .filter(([, v]) => v)
              .map(([k]) => k)
              .join(", ") || "—"}
          </div>
        </Row>

        <Row
          title={t("review.summary.rules")}
          editIdx={6}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>
            {data.rulePacks.banks.length} banks · {data.rulePacks.vipSenders.length} VIP ·{" "}
            {data.rulePacks.school || "—"}
          </div>
        </Row>

        <Row
          title={t("review.summary.routines")}
          editIdx={7}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div>{t("review.routineCount", { count: routinesOn })}</div>
          {data.routines.birthdays.length > 0 && (
            <div className="text-text-muted text-xs">
              {data.routines.birthdays.length} birthdays tracked
            </div>
          )}
        </Row>

        <Row
          title={t("review.summary.soul")}
          editIdx={8}
          onEdit={onEdit}
          editLabel={t("review.edit")}
        >
          <div className="text-text-muted text-xs">
            {data.personality.ownerProfile || data.personality.assistantSoul || data.personality.voiceNotes
              ? "Seeded"
              : "Default"}
          </div>
        </Row>
      </div>

      <div className="mt-8 border-t border-border-warm pt-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" onClick={() => setShowJson((s) => !s)} className="!py-2 !px-4 !text-sm">
            {showJson ? t("review.hideJson") : t("review.viewJson")}
          </Button>
          <Button variant="outline" onClick={copy} className="!py-2 !px-4 !text-sm">
            {copied ? t("review.copied") : t("review.copyJson")}
          </Button>
          <Button variant="outline" onClick={download} className="!py-2 !px-4 !text-sm">
            {t("review.downloadJson")}
          </Button>
        </div>

        {showJson && (
          <pre className="json-preview bg-midnight border border-border-warm rounded-xl p-4 text-xs text-amber-warm/90 overflow-auto max-h-[500px] font-mono leading-relaxed">
            {json}
          </pre>
        )}
      </div>
    </StepCard>
  );
}

function Row({
  title,
  children,
  editIdx,
  onEdit,
  editLabel,
}: {
  title: string;
  children: ReactNode;
  editIdx: number;
  onEdit: (idx: number) => void;
  editLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-ink/40 border border-border-warm">
      <div className="min-w-0 flex-1">
        <div className="text-[0.7rem] tracking-[0.15em] uppercase text-amber font-medium mb-1.5">
          {title}
        </div>
        <div className="text-sm text-cream font-light leading-relaxed space-y-0.5">{children}</div>
      </div>
      <button
        type="button"
        onClick={() => onEdit(editIdx)}
        className="text-xs text-text-muted hover:text-amber transition-colors shrink-0 cursor-pointer pt-1"
      >
        {editLabel}
      </button>
    </div>
  );
}
