import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { BookIcon, ChartIcon, HomeIcon, SettingsIcon, SparkIcon, VideoIcon } from './Icons';
import { StatusBadge } from './Ui';
import Onboarding from './Onboarding';
import SettingsPage from '../pages/SettingsPage';

const navItems = [
  { to: '/', label: 'Início', icon: HomeIcon },
  { to: '/cronograma', label: 'Cronograma', icon: BookIcon },
  { to: '/revisao', label: 'Revisão', icon: SparkIcon },
  { to: '/estatisticas', label: 'Estatísticas', icon: ChartIcon },
  { to: '/videoaulas', label: 'Vídeos', icon: VideoIcon }
];

function Brand() {
  return (
    <div className="flex items-center gap-4 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-4 py-4">
      <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-[0_12px_30px_var(--glow)]">
        <SparkIcon className="h-6 w-6" />
      </div>
      <div className="min-w-0 leading-tight">
        <strong className="block text-[16px] font-extrabold tracking-tight text-[var(--text)]">ENEM Planner</strong>
        <span className="block text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">assistente de estudos</span>
      </div>
    </div>
  );
}

export function AppShell() {
  const { state, actions, dashboard, themePalette, schedule } = usePlanner();
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const todayISO = new Date().toISOString().slice(0, 10);
  const nextActiveDay = (schedule?.weeks || [])
  .flatMap((week) => week.days)
  .find(
    (day) =>
      day.date > todayISO &&
      (day.type === 'study' || day.type === 'review')
  );

  useEffect(() => {
  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setInstallPrompt(event);
  };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

useEffect(() => {
  const mode =
    state.settings?.themeMode ||
    state.theme ||
    'dark';

  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;

  const themeColorMeta = document.querySelector(
    'meta[name="theme-color"]'
  );

  if (themeColorMeta) {
    themeColorMeta.setAttribute(
      'content',
      themePalette.bg
    );
  }

  const appleStatusBarMeta =
    document.querySelector(
      'meta[name="apple-mobile-web-app-status-bar-style"]'
    );

  if (appleStatusBarMeta) {
    appleStatusBarMeta.setAttribute(
      'content',
      mode === 'dark'
        ? 'black-translucent'
        : 'default'
    );
  }
}, [
  state.settings?.themeMode,
  state.settings?.accentColor,
  state.theme,
  themePalette.bg
]);

useEffect(() => {
  let lastScroll = window.scrollY;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 20) {
      setHeaderVisible(true);
    } else if (currentScroll > lastScroll) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true
  });

  return () =>
    window.removeEventListener('scroll', handleScroll);
}, []);

  

  async function handleInstallApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  const sidebarClassName = state.focusMode
    ? 'hidden'
    : 'hidden w-[352px] shrink-0 border-r border-[var(--border)] bg-[rgba(255,255,255,0.08)] px-4 pb-6 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col';

  const mobileNavClassName = state.focusMode
    ? 'hidden'
    : 'fixed inset-x-3 bottom-3 z-40 flex justify-between items-center gap-2 rounded-[20px] border px-2 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden';

  return (
  <div
  className="min-h-screen bg-[var(--bg)] text-[var(--text)]"
 style={{
  '--bg': themePalette.bg,
  '--surface': themePalette.surface,
  '--surface-alt': themePalette.surfaceAlt,
  '--primary': themePalette.primary,
  '--accent': themePalette.accent,
  '--text': themePalette.text,
  '--border': themePalette.border,
  '--muted': themePalette.muted,
  '--glow': themePalette.glow

}}
>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className={sidebarClassName}>
          <Brand />

          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-12 items-center gap-3 rounded-2xl border px-4 text-sm font-extrabold transition ${
                    isActive
                      ? 'border-transparent bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-lg shadow-[var(--glow)]'
                      : 'border-[var(--border)] bg-white/5 text-[var(--text)] hover:bg-white/10'
                  }`
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.08)] p-6 text-center">
            <strong className="block text-5xl font-black tracking-tight text-[var(--text)]">{dashboard.daysUntilEnem}</strong>
            <p className="mt-1 text-base font-semibold text-[var(--muted)]">dias restantes</p>
            <div className="mt-4 flex items-center gap-2">
              <StatusBadge status={online ? 'online' : 'offline'}>{online ? 'online' : 'offline'}</StatusBadge>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{online ? 'sincronizado' : 'modo offline'}</span>
            </div>
            <div className="mt-4 grid gap-2">
              {installPrompt ? (
                <button type="button" onClick={handleInstallApp} className="app-button-primary w-full">Instalar no celular</button>
              ) : null}
              <p className="text-xs leading-5 text-[var(--muted)]">No iPhone, use o menu de compartilhamento e toque em “Adicionar à Tela de Início”.</p>
            </div>
          </div>
        </aside>

        <div className={`flex min-h-screen w-full flex-1 flex-col ${state.focusMode ? 'lg:pl-0' : 'lg:pl-[352px]'}`}>
<header
  className={`sticky top-0 z-30 border-b border-[var(--border)] px-5 py-4 backdrop-blur-2xl lg:px-8 lg:py-5 safe-top transition-all duration-300 ${
    headerVisible
      ? 'translate-y-0 opacity-100'
      : '-translate-y-full opacity-0'
  }`}
  style={{
    backgroundColor:
      (state.settings?.themeMode || state.theme) === 'dark'
        ? 'rgba(5, 8, 20, 0.72)'
        : 'rgba(243, 246, 249, 0.88)'
  }}
>
  <div className="flex items-center justify-between gap-3">
    <div className="min-w-0">
      <p className="text-[12px] font-black uppercase tracking-[0.32em] text-[var(--muted)]">
        ENEM Planner
      </p>

      <p className="mt-1 truncate text-[15px] font-semibold text-[var(--text)] sm:text-base">
        {dashboard.todayReviewDay
          ? 'Hoje é dia de revisão.'
          : dashboard.todayStudyItems.length > 0
          ? 'Hoje é dia de estudar.'
          : nextActiveDay
          ? `Faltam ${Math.max(
              1,
              Math.round(
                (new Date(`${nextActiveDay.date}T00:00:00`) -
                  new Date(`${todayISO}T00:00:00`)) /
                  86400000
              )
            )} dias para o próximo estudo.`
          : 'Seu próximo estudo está definido.'}
      </p>
    </div>

    <button
      type="button"
      onClick={() => setSettingsOpen(true)}
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.1)] text-[15px] font-black text-[var(--text)] shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:w-auto sm:px-5"
      aria-label="Abrir configurações"
    >
      <SettingsIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Configurações</span>
    </button>
  </div>
</header>
            
          <main className="flex-1 px-4 pb-24 pt-4 lg:px-6 lg:pb-8">
            <Outlet />
          </main>
        </div>

        {/* Show onboarding modal if user hasn't completed initial setup */}
        {!state.settings?.onboardCompleted ? <Onboarding /> : null}

        {settingsOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Configurações"
            style={{ backgroundColor: (state.settings?.themeMode || state.theme) === 'dark' ? 'rgba(0,0,0,0.55)' : 'rgba(15, 23, 42, 0.18)' }}
          >
            <div className="absolute inset-0" onClick={() => setSettingsOpen(false)} />
            <div
              className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border p-4 shadow-[0_28px_100px_rgba(0,0,0,0.4)]"
              style={{
                backgroundColor: (state.settings?.themeMode || state.theme) === 'dark' ? 'rgba(5,8,20,0.96)' : 'rgba(247,251,255,0.98)',
                borderColor: themePalette.border,
                color: themePalette.text,
                boxShadow: (state.settings?.themeMode || state.theme) === 'dark' ? '0 28px 100px rgba(0,0,0,0.4)' : '0 28px 100px rgba(10,46,92,0.18)'
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--muted)]">Configurações</p>
                  <h2 className="text-xl font-black tracking-tight text-[var(--text)]">Ajuste seu plano</h2>
                </div>
                <button type="button" className="app-button-secondary" onClick={() => setSettingsOpen(false)}>
                  Fechar
                </button>
              </div>
              <SettingsPage />
            </div>
          </div>
        ) : null}

        <nav
          className={mobileNavClassName}
          role="navigation"
          aria-label="Menu móvel"
          style={{
            backgroundColor: (state.settings?.themeMode || state.theme) === 'dark' ? 'rgba(10, 14, 28, 0.92)' : 'rgba(247, 251, 255, 0.94)',
            borderColor: themePalette.border,
            boxShadow: (state.settings?.themeMode || state.theme) === 'dark' ? '0 18px 70px rgba(0, 0, 0, 0.45)' : '0 18px 60px rgba(10, 46, 92, 0.16)'
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-12 flex-1 min-w-0 overflow-hidden items-center justify-center gap-2 rounded-2xl px-2 py-1 text-[11px] font-bold leading-none transition ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-lg shadow-[var(--glow)]'
                    : 'text-[var(--muted)] hover:bg-white/5'
                }`
              }
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {state.focusMode ? (
          <button
            type="button"
            onClick={actions.toggleFocusMode}
            className="fixed right-4 top-4 z-50 rounded-full border border-transparent bg-[linear-gradient(135deg,var(--primary),var(--accent))] px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          >
            Sair do foco
          </button>
        ) : null}
      </div>
    </div>
  );
}
