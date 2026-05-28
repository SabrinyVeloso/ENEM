import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { BookIcon, ChartIcon, CloseIcon, HomeIcon, MenuIcon, MoonIcon, PenIcon, SettingsIcon, SparkIcon, SunIcon, VideoIcon } from './Icons';
import { StatusBadge } from './Ui';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/conteudos', label: 'Conteúdos', icon: BookIcon },
  { to: '/redacao', label: 'Redação', icon: PenIcon },
  { to: '/simulados', label: 'Simulados', icon: ChartIcon },
  { to: '/videoaulas', label: 'Videoaulas', icon: VideoIcon },
  { to: '/estatisticas', label: 'Estatísticas', icon: ChartIcon },
  { to: '/configuracoes', label: 'Configurações', icon: SettingsIcon }
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-[18px] bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-lg font-black text-white shadow-lg shadow-[var(--glow)]">
        E
      </div>
      <div className="leading-tight">
        <strong className="block text-[15px] font-extrabold text-[var(--text)]">ENEM Planner</strong>
        <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">mobile first dashboard</span>
      </div>
    </div>
  );
}

export function AppShell() {
  const { state, actions, dashboard, themePalette } = usePlanner();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  async function handleInstallApp() {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]" style={{ '--primary': themePalette.primary, '--accent': themePalette.accent, '--border': themePalette.border, '--muted': themePalette.muted, '--glow': themePalette.glow }}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className={`fixed inset-y-0 left-0 z-40 w-[86vw] max-w-[320px] border-r border-[var(--border)] bg-[rgba(255,255,255,0.08)] px-4 pb-6 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${drawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="mb-6 flex items-center justify-between lg:justify-start">
            <Brand />
            <button type="button" onClick={() => setDrawerOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-white/10 text-lg font-black lg:hidden">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setDrawerOpen(false)}
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

        <div className="flex min-h-screen w-full flex-1 flex-col lg:pl-[320px]">
          <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[rgba(255,255,255,0.08)] px-4 py-4 backdrop-blur-2xl lg:px-6">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setDrawerOpen(true)} className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--border)] bg-white/10 text-xl font-black lg:hidden">
                <MenuIcon className="h-5 w-5" />
              </button>
              <Brand />
              <button type="button" onClick={actions.toggleTheme} className="flex h-12 items-center gap-2 rounded-2xl border border-[var(--border)] bg-white/10 px-4 text-sm font-extrabold text-[var(--text)]">
                {state.theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                <span className="hidden sm:inline">Tema</span>
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 pb-8 pt-4 lg:px-6">
            <Outlet />
          </main>
        </div>

        {drawerOpen ? <button type="button" aria-label="Fechar menu" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" /> : null}
      </div>
    </div>
  );
}