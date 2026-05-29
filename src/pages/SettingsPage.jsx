import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';

export default function SettingsPage() {
  const { state, actions } = usePlanner();
  const [profileName, setProfileName] = useState(state.settings.profileName);
  const [weeklyGoal, setWeeklyGoal] = useState(state.settings.weeklyGoal);
  const [studyMinutes, setStudyMinutes] = useState(state.settings.studyMinutes);
  const [notifications, setNotifications] = useState(state.settings.notifications);

  function saveSettings() {
    actions.updateSettings({ profileName, weeklyGoal: Number(weeklyGoal), studyMinutes: Number(studyMinutes), notifications });
  }

  function exportState() {
    const text = JSON.stringify(state, null, 2);
    navigator.clipboard?.writeText(text).catch(() => window.prompt('Copie o JSON abaixo', text));
  }

  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader eyebrow="Configurações" title="Tema, metas, perfil e notificações" subtitle="Ajustes rápidos, com tudo salvo localmente no navegador." />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => actions.setTheme('light')} className="app-button-secondary">Tema claro</button>
            <button type="button" onClick={() => actions.setTheme('dark')} className="app-button-secondary">Tema escuro</button>
            <StatusBadge status={state.theme === 'dark' ? 'simulado' : 'done'}>{state.theme}</StatusBadge>
          </div>

          <div className="mt-4 grid gap-3">
            <input className="input-shell w-full" value={profileName} onChange={(event) => setProfileName(event.target.value)} placeholder="Seu nome" />
            <input className="input-shell w-full" type="number" value={weeklyGoal} onChange={(event) => setWeeklyGoal(event.target.value)} min="1" max="30" placeholder="Meta semanal" />
            <input className="input-shell w-full" type="number" value={studyMinutes} onChange={(event) => setStudyMinutes(event.target.value)} min="15" max="600" step="15" placeholder="Minutos diários" />

            <label className="flex items-center gap-3 rounded-[24px] border border-[var(--border)] bg-white/5 px-4 py-4 text-sm font-semibold text-[var(--text)]">
              <input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />
              Notificações locais e lembretes visuais
            </label>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={saveSettings} className="app-button-primary">Salvar</button>
              <button type="button" onClick={exportState} className="app-button-secondary">Exportar JSON</button>
              <button type="button" onClick={actions.resetAll} className="app-button-secondary">Resetar dados</button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <SectionHeader eyebrow="Perfil" title="Resumo atual" subtitle="Ajuste as preferências e use o app como um painel pessoal de estudos." />
          <div className="mt-4 grid gap-3">
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Nome</p>
              <strong className="mt-2 block text-xl font-black">{state.settings.profileName}</strong>
            </div>
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Meta semanal</p>
              <strong className="mt-2 block text-xl font-black">{state.settings.weeklyGoal} conteúdos</strong>
            </div>
            <div className="rounded-[24px] border border-[var(--border)] bg-white/5 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">Minutos diários</p>
              <strong className="mt-2 block text-xl font-black">{state.settings.studyMinutes} min</strong>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}