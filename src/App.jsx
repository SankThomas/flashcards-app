import { useState, useEffect } from "react";
import { Plus, BarChart3 } from "lucide-react";
import FlashcardDeck from "./components/FlashcardDeck";
import FlashcardForm from "./components/FlashcardForm";
import Stats from "./components/Stats";
import { loadFlashcards, saveFlashcards } from "./utils/storage";

export default function App() {
  const [flashcards, setFlashcards] = useState(() => loadFlashcards());
  const [currentView, setCurrentView] = useState("deck");
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    saveFlashcards(flashcards);
  }, [flashcards]);

  const addFlashcard = (cardData) => {
    const newCard = {
      id: Date.now(),
      ...cardData,
      createdAt: new Date().toISOString(),
      correctCount: 0,
      incorrectCount: 0,
      lastReviewed: null,
    };
    setFlashcards((prev) => [...prev, newCard]);
    setCurrentView("deck");
  };

  const updateFlashcard = (cardData) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === editingCard.id ? { ...card, ...cardData } : card,
      ),
    );
    setEditingCard(null);
    setCurrentView("deck");
  };

  const deleteFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  const updateCardStats = (id, isCorrect) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              correctCount: isCorrect
                ? card.correctCount + 1
                : card.correctCount,
              incorrectCount: !isCorrect
                ? card.incorrectCount + 1
                : card.incorrectCount,
              lastReviewed: new Date().toISOString(),
            }
          : card,
      ),
    );
  };

  const startEditing = (card) => {
    setEditingCard(card);
    setCurrentView("form");
  };

  const cancelEditing = () => {
    setEditingCard(null);
    setCurrentView("deck");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-amber-950">Flashcards</h1>
            </div>

            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("deck")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === "deck" ? "bg-amber-100 text-amber-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              >
                Study
              </button>

              <button
                onClick={() => setCurrentView("stats")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentView === "stats" ? "bg-amber-100 text-amber-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              >
                <BarChart3 className="size-4" />
                <span>Stats</span>
              </button>

              <button
                onClick={() => {
                  setEditingCard(null);
                  setCurrentView("form");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-amber-600 text-white hover:bg-amber-700 `}
              >
                <Plus className="size-4" />
                <span>New Card</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 mt-6">
        {currentView === "deck" && (
          <FlashcardDeck
            flashcards={flashcards}
            onDelete={deleteFlashcard}
            onEdit={startEditing}
            onUpdateStats={updateCardStats}
          />
        )}

        {currentView === "form" && (
          <FlashcardForm
            onSubmit={editingCard ? updateFlashcard : addFlashcard}
            onCancel={cancelEditing}
            initialData={editingCard}
            isEditing={!!editingCard}
          />
        )}

        {currentView === "stats" && <Stats flashcards={flashcards} />}
      </main>
    </div>
  );
}
