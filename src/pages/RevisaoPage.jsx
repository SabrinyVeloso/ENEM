import React from 'react';
import { Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import { EmptyState, GlassCard, SectionHeader, StatTile } from '../components/Ui';

export default function RevisaoPage() {
  const { dashboard } = usePlanner();

  return (
    <div className="grid gap-4 pb-6">

      <GlassCard className="p-4 sm:p-5">
        <SectionHeader
          eyebrow="Revisão"
          title="Flashcards inteligentes"
          subtitle="Revise conteúdos usando repetição espaçada."
        />

        <div className="mt-5">
          <Link
            to="/flashcards"
            className="app-button-primary"
          >
            Iniciar revisão
          </Link>
        </div>
      </GlassCard>

      <section className="grid gap-4 xl:grid-cols-3">
        <StatTile
          label="Acertos"
          value={dashboard.flashcardCorrect}
          caption="respostas corretas"
          tone="good"
        />

        <StatTile
          label="Erros"
          value={dashboard.flashcardIncorrect}
          caption="respostas incorretas"
          tone="bad"
        />

        <StatTile
          label="Aproveitamento"
          value={`${dashboard.flashcardAccuracy}%`}
          caption="taxa de acerto"
          tone="brand"
        />
      </section>

      {dashboard.reviewDeck.length === 0 && (
        <GlassCard className="p-5">
          <EmptyState
            title="Nenhum flashcard disponível"
            subtitle="Conclua conteúdos para gerar flashcards."
          />
        </GlassCard>
      )}

    </div>
  );
}