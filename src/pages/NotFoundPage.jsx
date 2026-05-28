import React from 'react';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="glass-panel max-w-md p-6 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--accent)]">404</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-[var(--text)]">Página não encontrada</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Use o menu lateral para voltar a uma das telas do app.</p>
        <a href="#/" className="app-button-primary mt-5">Voltar para Home</a>
      </div>
    </div>
  );
}