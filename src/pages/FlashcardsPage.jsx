import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { GlassCard } from '../components/Ui';

export default function FlashcardsPage() {
  const { dashboard, actions } = usePlanner();

  const deck = dashboard.reviewDeck || [];

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  
const currentCard = deck[cardIndex];

if (correctCount + incorrectCount >= 30) {
  return (
    <GlassCard className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-3">
        Revisão concluída!
      </h2>

      <p>
        ✅ Acertos: {correctCount}
      </p>

      <p>
        ❌ Erros: {incorrectCount}
      </p>
    </GlassCard>
  );
}
  if (!currentCard) {
    return (
      <GlassCard className="p-5">
        Nenhum flashcard disponível.
      </GlassCard>
    );
  }

  function nextCard() {
    setFlipped(false);
    setDragOffset(0);

    setCardIndex((current) =>
      current + 1 >= deck.length ? 0 : current + 1
    );
  }

  function previousCard() {
    setFlipped(false);
    setDragOffset(0);

    setCardIndex((current) =>
      current === 0 ? deck.length - 1 : current - 1
    );
  }

  function markCorrect() {
     setCorrectCount(c => c + 1);
    actions.recordFlashcardResult(
      currentCard,
      'correct'
    );

    nextCard();
  }

  function markIncorrect() {
    setIncorrectCount(c => c + 1);
    actions.recordFlashcardResult(
      currentCard,
      'incorrect'
    );

    nextCard();
  }

  function startDrag(e) {
    setDragStart(
      e.type.includes('mouse')
        ? e.clientX
        : e.touches[0].clientX
    );
  }

  function moveDrag(e) {
    if (dragStart === null) return;

    const currentX =
      e.type.includes('mouse')
        ? e.clientX
        : e.touches[0].clientX;

    setDragOffset(currentX - dragStart);
  }

  function finishDrag() {
    if (dragOffset > 120) {
      markCorrect();
    } else if (dragOffset < -120) {
      markIncorrect();
    }

    setDragStart(null);
    setDragOffset(0);
  }

  return (
    <div className="max-w-3xl mx-auto py-6">

      <div className="flex justify-between items-center mb-5">
       <div className="mb-4">
  Respondidas: {correctCount + incorrectCount}/30

  <br />

  ✅ {correctCount} | ❌ {incorrectCount}
</div>
        <h1 className="text-2xl font-black">
          Revisão
        </h1>

        <span>
          {cardIndex + 1}/{deck.length}
        </span>
      </div>

      <div className="text-center mb-4 text-sm opacity-70">
        ← Arraste para esquerda = Errei
        <br />
        Arraste para direita = Acertei →
      </div>

      <div
        className="flashcard-wrapper"
        onMouseDown={startDrag}
        onMouseMove={moveDrag}
        onMouseUp={finishDrag}
        onMouseLeave={finishDrag}
        onTouchStart={startDrag}
        onTouchMove={moveDrag}
        onTouchEnd={finishDrag}
      >
        <div
          className={`
            flashcard-container
            ${flipped ? 'flipped' : ''}
          `}
    style={{
  transform: `
    translateX(${dragOffset}px)
    rotate(${dragOffset / 20}deg)
    ${flipped ? 'rotateY(180deg)' : ''}
  `
}}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="flashcard-front">
            <div>
              <div className="mb-3 text-xs uppercase opacity-60">
                Pergunta
              </div>

              <h2 className="text-2xl font-bold">
                {currentCard.front}
              </h2>
            </div>

            <p className="mt-6 text-sm opacity-70">
              Toque para revelar a resposta
            </p>
          </div>

          <div className="flashcard-back">
            <div>
              <div className="mb-3 text-xs uppercase opacity-60">
                Resposta
              </div>

              <h2 className="text-2xl font-bold">
                {currentCard.back}
              </h2>
            </div>

<p className="mt-6 text-sm opacity-70">
  ➡️ Acertei
  <br />
  ⬅️ Errei
</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={previousCard}
          className="app-button-secondary"
        >
          ← Voltar
        </button>

        <button
          onClick={nextCard}
          className="app-button-primary"
        >
          Pular →
        </button>
      </div>

      {flipped && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={markIncorrect}
            className="app-button-secondary"
          >
            ❌ Errei
          </button>

          <button
            onClick={markCorrect}
            className="app-button-primary"
          >
            ✅ Acertei
          </button>
        </div>
      )}
    </div>
  );
}