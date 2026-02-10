import { useState } from "react";

export default function Flashcard({ card, showAnswer, onFlip }) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      onFlip();
      setIsFlipping(false);
    }, 150);
  };

  return (
    <div className="relative w-full h-80 perspective-distant">
      <div
        className={`relative size-full cursor-pointer transition-transform duration-300 transform-style-preserve-3d ${isFlipping ? "scale-95" : ""} ${showAnswer ? "rotate-y-180" : ""}`}
        onClick={handleFlip}
      >
        <div
          className={`
        absolute inset-0 size-full backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col justify-center items-center p-8 ${showAnswer ? "rotate-y-180" : ""}
        `}
        >
          <div className="text-center">
            <p className="text-sm text-amber-600 font-medium mb-2 uppercase tracking-wide">
              Question
            </p>
            <p className="text-xl font-semibold text-gray-800 leading-relaxed">
              {card.front}
            </p>
          </div>

          <div className="absolute bottom-4 text-xs text-gray-400">
            Click to reveal answer
          </div>
        </div>

        <div
          className={`
        absolute inset-0 size-full backface-hidden bg-amber-50 rounded-xl shadow-lg border border-amber-200 flex flex-col justify-center items-center p-8 rotate-y-180 ${showAnswer ? "" : "rotate-y-180"}
        `}
        >
          <div className="text-center">
            <p className="text-sm text-amber-600 font-medium mb-2 uppercase tracking-wide">
              Answer
            </p>
            <p className="text-base text-gray-800 leading-relaxed">
              {card.back}
            </p>
          </div>

          <div className="absolute bottom-4 text-xs text-gray-400">
            Did you get it right?
          </div>
        </div>
      </div>
    </div>
  );
}
