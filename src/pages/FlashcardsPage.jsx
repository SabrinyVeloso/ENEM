import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlanner } from "../context/PlannerContext";
import { GlassCard } from "../components/Ui";

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const { dashboard, actions } = usePlanner();

  const deck = dashboard.reviewDeck || [];

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const scrollRef = useRef(null);

  const currentCard = deck[cardIndex];

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setHeaderVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (scrollRef.current && scrollRef.current.scrollTop > 50) {
          setHeaderVisible(false);
        }
      }, 200);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (correctCount + incorrectCount >= 30) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center p-4">
        <div className="absolute inset-0 bg-black/40" />
        <GlassCard className="relative max-w-sm p-6 text-center">
          <h2 className="text-3xl font-black mb-6">🎉 Revisão concluída!</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs opacity-60 mb-1">Acertos</p>
              <p className="text-2xl font-black text-green-500">
                ✅ {correctCount}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-xs opacity-60 mb-1">Erros</p>
              <p className="text-2xl font-black text-red-500">
                ❌ {incorrectCount}
              </p>
            </div>
          </div>

          <p className="text-sm opacity-70 mb-6">
            Acurácia:{" "}
            <span className="font-bold">
              {Math.round(
                (correctCount / (correctCount + incorrectCount)) * 100,
              )}
              %
            </span>
          </p>

          <button
            onClick={() => navigate(-1)}
            className="app-button-primary w-full"
          >
            Voltar
          </button>
        </GlassCard>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <GlassCard className="p-6 text-center max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-3">Nenhum flashcard disponível</h2>
        <p className="text-sm opacity-70 mb-4">
          Você não tem cartões para revisar no momento.
        </p>
        <button
          onClick={() => navigate("/")}
          className="app-button-primary w-full"
        >
          Voltar para Home
        </button>
      </GlassCard>
    );
  }

  function nextCard() {
    setFlipped(false);
    setDragOffset(0);
    setCardIndex((current) => (current + 1 >= deck.length ? 0 : current + 1));
  }

  function markCorrect() {
    setCorrectCount((c) => c + 1);
    actions.recordFlashcardResult(currentCard, "correct");
    nextCard();
  }

  function markIncorrect() {
    setIncorrectCount((c) => c + 1);
    actions.recordFlashcardResult(currentCard, "incorrect");
    nextCard();
  }

  function handleExitClick() {
    if (correctCount + incorrectCount > 0) {
      setShowExitConfirm(true);
    } else {
      navigate(-1);
    }
  }

  function startDrag(e) {
    setDragStart(e.type.includes("mouse") ? e.clientX : e.touches[0].clientX);
  }

  function moveDrag(e) {
    if (dragStart === null) return;
    const currentX = e.type.includes("mouse")
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
    <div ref={scrollRef} className="h-screen overflow-y-auto bg-[var(--bg)]">
      {/* Header - Sticky */}
      <div
        className={`sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] transition-all duration-300 ${
          headerVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleExitClick}
              className="px-4 py-3 text-base font-semibold rounded-lg hover:bg-[var(--surface-alt)] transition-colors"
            >
              ← Sair
            </button>
            <div className="text-center">
              <p className="text-base opacity-70">Respondidas</p>
              <p className="text-3xl sm:text-4xl font-black">
                {correctCount + incorrectCount}/30
              </p>
            </div>
            <div className="px-4 py-3 text-base font-semibold opacity-0">
              placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-6 text-xs sm:text-sm opacity-70">
          ← Arraste para esquerda = Errei | Arraste para direita = Acertei →
        </div>

        {/* Flashcard */}
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
            className={`flashcard-container ${flipped ? "flipped" : ""}`}
            style={{
              transform: `translateX(${dragOffset}px) rotate(${dragOffset / 20}deg) ${
                flipped ? "rotateY(180deg)" : ""
              }`,
            }}
            onClick={() => setFlipped(!flipped)}
          >
            <div className="flashcard-front">
              <div>
                <div className="mb-3 text-xs uppercase opacity-60">
                  Pergunta
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
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
                <h2 className="text-2xl sm:text-3xl font-bold">
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button
            onClick={() =>
              setCardIndex((i) => (i === 0 ? deck.length - 1 : i - 1))
            }
            className="app-button-secondary"
          >
            ← Anterior
          </button>

          <button onClick={nextCard} className="app-button-primary">
            Próximo →
          </button>
        </div>

        {flipped && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={markIncorrect} className="app-button-secondary">
              ❌ Errei
            </button>

            <button onClick={markCorrect} className="app-button-primary">
              ✅ Acertei
            </button>
          </div>
        )}
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowExitConfirm(false)}
          />
          <GlassCard className="relative max-w-sm p-6 text-center">
            <h3 className="text-xl font-bold mb-3">Sair da revisão?</h3>
            <p className="text-sm opacity-70 mb-6">
              Você respondeu{" "}
              <span className="font-semibold">
                {correctCount + incorrectCount} cartões
              </span>{" "}
              e perderá este progresso se sair agora.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="app-button-secondary"
              >
                Continuar
              </button>
              <button
                onClick={() => navigate(-1)}
                className="app-button-primary"
              >
                Sair mesmo assim
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
