import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { BookIcon, ChartIcon, HomeIcon, MoonIcon, PenIcon, RefreshIcon, SettingsIcon, SunIcon, VideoIcon } from './Icons';
import { StatusBadge } from './Ui';
import Onboarding from './Onboarding';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/conteudos', label: 'Conteúdos', icon: BookIcon },
  { to: '/recuperacao', label: 'Recuperação', icon: RefreshIcon },
  { to: '/redacao', label: 'Redação', icon: PenIcon },
  { to: '/estatisticas', label: 'Estatísticas', icon: ChartIcon },
  { to: '/videoaulas', label: 'Vídeo', icon: VideoIcon },
  { to: '/configuracoes', label: 'Config', icon: SettingsIcon }
];

function Brand() {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-3 py-3">
      <div className="min-w-0 leading-tight">
        <strong className="block text-[14px] font-extrabold tracking-tight text-[var(--text)]">Plataforma de estudos</strong>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">ENEM</span>
      </div>
    </div>
  );
}

export function AppShell() {
  const { state, actions, dashboard, themePalette } = usePlanner();
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);

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
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.colorScheme = state.theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', themePalette.bg);
    }

    const appleStatusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusBarMeta) {
      appleStatusBarMeta.setAttribute('content', state.theme === 'dark' ? 'black-translucent' : 'default');
    }
  }, [state.theme, themePalette.bg]);

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
    : 'fixed inset-x-3 bottom-3 z-40 grid grid-cols-7 gap-1 rounded-[24px] border px-2 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]" style={{ '--primary': themePalette.primary, '--accent': themePalette.accent, '--border': themePalette.border, '--muted': themePalette.muted, '--glow': themePalette.glow }}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className={sidebarClassName}>
          <Brand />

          <button type="button" onClick={actions.toggleTheme} className="app-button-secondary mt-6 w-full justify-center gap-2">
            {state.theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span>Tema</span>
          </button>

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

          <div className="mt-6 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.08)] p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">ENEM</p>
            <strong className="mt-2 block text-3xl font-black tracking-tight text-[var(--text)]">{dashboard.daysUntilEnem}</strong>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Faltam dias para o ENEM.</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">{state.settings.profileName}</p>
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
          <main className="flex-1 px-4 pb-24 pt-4 lg:px-6 lg:pb-8">
            <Outlet />
          </main>
        </div>

        {/* Show onboarding modal if user hasn't completed initial setup */}
        {!state.settings?.onboardCompleted ? <Onboarding /> : null}

        <nav
          className={mobileNavClassName}
          style={{
            backgroundColor: state.theme === 'dark' ? 'rgba(10, 14, 28, 0.92)' : 'rgba(247, 251, 255, 0.94)',
            borderColor: themePalette.border,
            boxShadow: state.theme === 'dark' ? '0 18px 70px rgba(0, 0, 0, 0.45)' : '0 18px 60px rgba(10, 46, 92, 0.16)'
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-bold leading-none transition ${
                  isActive
                    ? 'bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-white shadow-lg shadow-[var(--glow)]'
                    : 'text-[var(--muted)]'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
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