import React from 'react';
import { SparkIcon } from './Icons';

export function GlassCard({ className = '', children }) {
  return (
    <div className={`ui-card rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.08)] shadow-[0_12px_36px_rgba(0,0,0,0.08)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action, icon }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        {(eyebrow || icon) ? (
          <div className="flex items-center gap-2">
            {icon ? (
              <span className="grid h-8 w-8 place-items-center rounded-2xl border border-[var(--border)] bg-white/10 text-[var(--muted)] shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                {icon}
              </span>
            ) : null}
            {eyebrow ? <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p> : null}
          </div>
        ) : null}
        <h2 className="text-xl font-extrabold tracking-tight text-[var(--text)] drop-shadow-[0_1px_0_rgba(0,0,0,0.12)]">{title}</h2>
        {subtitle ? <p className="text-sm leading-6 text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function ProgressBar({ value, tone = 'var(--primary)' }) {
  return (
    <div className="h-3 overflow-hidden rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.08)]">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${tone}, var(--accent))` }} />
    </div>
  );
}

export function StatTile({ label, value, caption, tone = 'good' }) {
  const toneMap = {
    good: 'text-emerald-400',
    warn: 'text-amber-400',
    bad: 'text-rose-400',
    brand: 'text-[var(--muted)]'
  };

  return (
    <GlassCard className="p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">{label}</p>
      <strong className="mt-2 block text-3xl font-black tracking-tight text-[var(--text)]">{value}</strong>
      {caption ? <p className={`mt-1 text-sm font-semibold ${toneMap[tone]}`}>{caption}</p> : null}
    </GlassCard>
  );
}

export function FilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-chip min-h-11 rounded-full px-4 py-2 text-sm font-extrabold transition active:scale-[0.98] ${
        active
          ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-lg shadow-[var(--glow)]'
          : 'border border-[var(--border)] bg-[rgba(255,255,255,0.08)] text-[var(--text)]'
      }`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status, children }) {
  const palette = {
    done: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    perdido: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    lost: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    pending: 'bg-white/10 text-[var(--muted)] border-[var(--border)]',
    rest: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
    simulado: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    online: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    offline: 'bg-slate-500/20 text-slate-200 border-slate-400/25',
    hot: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    frequent: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    medium: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    hard: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    review: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25'
  };

  return <span className={`status-badge inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] ${palette[status] || palette.pending}`}>{children}</span>;
}

export function EmptyState({ title, subtitle, action }) {
  return (
    <GlassCard className="grid place-items-center gap-3 px-6 py-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.08)] text-[var(--accent)]">
        <SparkIcon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-extrabold text-[var(--text)]">{title}</h3>
      {subtitle ? <p className="max-w-sm text-sm leading-6 text-[var(--muted)]">{subtitle}</p> : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </GlassCard>
  );
}