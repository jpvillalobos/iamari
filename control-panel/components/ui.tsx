"use client";

import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ButtonHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-cream mb-1.5">
        {label}
        {required && <span className="text-amber ml-1">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-text-muted mt-1.5 font-light leading-relaxed">{hint}</span>}
    </label>
  );
}

const inputClasses =
  "w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-border-warm text-cream placeholder:text-text-muted/60 outline-none transition-colors focus:border-amber/50 focus:bg-white/[0.05] font-sans text-[0.95rem]";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputClasses} resize-y min-h-[88px] leading-relaxed ${props.className ?? ""}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22%20fill=%22%238a9ab5%22><path%20fill-rule=%22evenodd%22%20d=%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule=%22evenodd%22/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10 ${props.className ?? ""}`}
    />
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" | "danger" }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-[0.95rem] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none";
  const styles = {
    primary:
      "bg-amber text-midnight hover:bg-amber-warm hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(240,165,0,0.25)] disabled:hover:translate-y-0 disabled:hover:shadow-none",
    ghost: "text-text-muted hover:text-cream",
    outline:
      "border border-border-warm text-cream hover:border-amber/50 hover:bg-glow",
    danger:
      "border border-red-500/40 text-red-300 hover:border-red-400 hover:bg-red-500/10",
  };
  return <button {...props} className={`${base} ${styles[variant]} ${className ?? ""}`} />;
}

export function Toggle({
  on,
  onClick,
  label,
  description,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
        on
          ? "border-amber/50 bg-glow"
          : "border-border-warm bg-ink/40 hover:border-amber/25 hover:bg-ink/60"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`relative shrink-0 w-11 h-[26px] rounded-full transition-colors mt-0.5 ${
            on ? "bg-amber" : "bg-ink-light"
          }`}
        >
          <span
            className={`absolute top-[3px] w-5 h-5 rounded-full bg-cream transition-all ${
              on ? "left-[22px]" : "left-[3px]"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-cream text-[0.95rem]">{label}</div>
          {description && (
            <div className="text-sm text-text-muted mt-1 font-light leading-relaxed">{description}</div>
          )}
        </div>
      </div>
    </button>
  );
}

export function Checkbox({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="flex items-center gap-3 cursor-pointer select-none group"
    >
      <span
        className={`shrink-0 w-5 h-5 rounded border transition-all flex items-center justify-center ${
          on
            ? "bg-amber border-amber"
            : "border-border-warm bg-white/[0.03] group-hover:border-amber/40"
        }`}
      >
        {on && (
          <svg className="w-3 h-3 text-midnight" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="3">
            <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-[0.95rem] text-cream font-light">{label}</span>
    </button>
  );
}

export function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glow border border-border-warm text-amber-warm text-sm">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-text-muted hover:text-cream transition-colors cursor-pointer"
        aria-label="Remove"
      >
        ×
      </button>
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative bg-ink/60 border border-border-warm rounded-2xl p-6 sm:p-8 backdrop-blur-sm ${
        className ?? ""
      }`}
    >
      {children}
    </section>
  );
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  right,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        {kicker && (
          <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-3">
            {kicker}
          </div>
        )}
        <h1 className="font-display text-3xl sm:text-4xl leading-[1.15] tracking-tight text-cream mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-muted leading-relaxed font-light max-w-2xl">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </header>
  );
}
