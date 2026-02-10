import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Edit2,
  Trash2,
  BookOpen,
} from "lucide-react";
import Flashcard from "./Flashcard";

export default function FlashcardDeck({
  flashcards,
  onDelete,
  onEdit,
  onUpdateStats,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswer = (isCorrect) => {
    onUpdateStats(currentCard.id, isCorrect);
    setTimeout(() => {
      nextCard();
    }, 500);
  };

  const resetCard = () => {
    setShowAnswer(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="size-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No flashcards yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first flashcard to start studying
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((currentIndex + 1) / flashcards.length) * 100)}%
            complete
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-amber-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / flashcards.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="relative">
        <Flashcard
          card={currentCard}
          showAnswer={showAnswer}
          onFlip={() => setShowAnswer(!showAnswer)}
        />

        <div className="flex items-center justify-between mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(currentCard)}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Edit Card"
            >
              <Edit2 className="size-5" />
            </button>

            <button
              onClick={() => onDelete(currentCard.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Card"
            >
              <Trash2 className="size-5" />
            </button>

            <button
              onClick={resetCard}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reset Card"
            >
              <RotateCcw className="size-5" />
            </button>
          </div>

          {showAnswer && (
            <div className="flex space-x-3">
              <button
                onClick={() => handleAnswer(false)}
                className="px-6 py-2 bg-red-500/30 text-red-500 rounded-lg hover:text-white hover:bg-red-600 transition-colors font-medium"
              >
                Incorrect
              </button>

              <button
                onClick={() => handleAnswer(true)}
                className="px-6 py-2 bg-green-500/30 text-green-500 rounded-lg hover:text-white hover:bg-green-600 transition-colors font-medium"
              >
                Correct
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="size-5" />
          <span>Previous</span>
        </button>

        <span className="text-gray-600 font-medium">
          {currentIndex + 1} / {flashcards.length}
        </span>

        <button
          onClick={nextCard}
          disabled={currentIndex === flashcards.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="size-5" />
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}
