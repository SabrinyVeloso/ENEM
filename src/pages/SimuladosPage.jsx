import React from 'react';
import { GlassCard, SectionHeader, StatusBadge } from '../components/Ui';
import { BookIcon, SparkIcon } from '../components/Icons';

const resources = [
  {
    name: 'INEP - Provas e gabaritos',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos',
    note: 'Fonte oficial para baixar provas anteriores e gabaritos do ENEM.',
    tag: 'oficial'
  },
  {
    name: 'Toda Matéria - Simulado ENEM',
    url: 'https://www.todamateria.com.br/simulado-enem/',
    note: 'Banco de questões e simulados com correção para treino rápido.',
    tag: 'gratuito'
  },
  {
    name: 'Brasil Escola - Simulado ENEM',
    url: 'https://www.brasilescola.uol.com.br/enem/simulados/',
    note: 'Simulados temáticos e revisão por área de conhecimento.',
    tag: 'grátis'
  },
  {
    name: 'Me Salva! ENEM',
    url: 'https://www.mesalva.com/',
    note: 'Conteúdo de estudo com atividades e simulados para revisão.',
    tag: 'plataforma'
  }
];

export default function SimuladosPage() {
  return (
    <div className="grid gap-4 pb-6">
      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          eyebrow="Simulados"
          title="Sites gratuitos para provas anteriores do ENEM"
          subtitle="Abra no celular e use provas oficiais, bancos de questões e simulados online sem pagar nada."
          icon={<SparkIcon className="h-4 w-4" />}
        />
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {resources.map((site) => (
          <GlassCard key={site.name} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--muted)]">{site.tag}</p>
                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--text)]">{site.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{site.note}</p>
              </div>
              <StatusBadge status="pending">site</StatusBadge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <a href={site.url} target="_blank" rel="noreferrer" className="app-button-primary">
                Abrir site
              </a>
              <a href={site.url} target="_blank" rel="noreferrer" className="app-button-secondary">
                Ver simulados
              </a>
            </div>
          </GlassCard>
        ))}
      </section>

      <GlassCard className="p-4">
        <SectionHeader
          eyebrow="Dica"
          title="Atalho na tela inicial"
          subtitle="No celular, abra o site, toque em compartilhar e escolha adicionar à tela inicial para ficar como app."
          icon={<BookIcon className="h-4 w-4" />}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status="online">gratuito</StatusBadge>
          <StatusBadge status="offline">provas antigas</StatusBadge>
          <StatusBadge status="simulado">treino guiado</StatusBadge>
        </div>
      </GlassCard>
    </div>
  );
}
