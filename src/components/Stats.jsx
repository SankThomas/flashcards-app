import { Target } from "lucide-react";

export default function Stats({ flashcards }) {
  const totalCards = flashcards.length;
  const reviewedCards = flashcards.filter((card) => card.lastReviewed).length;
  const totalCorrect = flashcards.reduce(
    (sum, card) => sum + card.correctCount,
    0,
  );
  const totalIncorrect = flashcards.reduce(
    (sum, card) => sum + card.incorrectCount,
    0,
  );
  const totalAttempts = totalCorrect + totalIncorrect;
  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const categories = [
    ...new Set(flashcards.map((card) => card.category || "General")),
  ];

  const getCategoryStats = (category) => {
    const categoryCards = flashcards.filter(
      (card) => (card.category || "General") === category,
    );
    const correct = categoryCards.reduce(
      (sum, card) => sum + card.correctCount,
      0,
    );
    const incorrect = categoryCards.reduce(
      (sum, card) => sum + card.incorrectCount,
      0,
    );
    const total = correct + incorrect;
    const categoryAccuracy =
      total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      cards: categoryCards.length,
      attempts: total,
      accuracy: categoryAccuracy,
    };
  };

  const getRecentActivity = () => {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);

    return flashcards.filter(
      (card) =>
        card.lastReviewed && new Date(card.lastReviewed) >= threeDaysAgo,
    ).length;
  };

  if (totalCards === 0) {
    return (
      <div className="text-center py-16">
        <Target className="size-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No study data yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create some flashcards and start studying to see your progress
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Study Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Cards Reviewed</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviewedCards}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{accuracy}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Recent Activity</p>
              <p className="text-2xl font-bold text-gray-900">
                {getRecentActivity()}
              </p>
            </div>
          </div>
        </div>

        {totalAttempts > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Overview
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Correct Answers</span>
                  <span>
                    {totalCorrect} / {totalAttempts}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 rounded-full h-3 transition-all duration-500"
                    style={{
                      width: `${(totalCorrect / totalAttempts) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Incorrect Answers</span>
                  <span>
                    {totalIncorrect} / {totalAttempts}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 rounded-full h-3 transition-all duration-500"
                    style={{
                      width: `${(totalIncorrect / totalAttempts) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Breakdown
            </h3>

            <div className="space-y-4">
              {categories.map((category) => {
                const stats = getCategoryStats(category);

                return (
                  <div
                    key={category}
                    className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{category}</h4>
                      <span className="text-sm text-gray-600">
                        {stats.cards} {stats.cards === 1 ? "card" : "cards"}
                      </span>
                    </div>

                    {stats.attempts > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>
                          {stats.attempts}{" "}
                          {stats.attempts === 1 ? "attempt" : "attempts"}
                        </span>
                        <span
                          className={`font-medium ${stats.accuracy >= 80 ? "text-green-600" : stats.accuracy >= 60 ? "text-amber-600" : "text-red-600"}`}
                        >
                          {stats.accuracy}% accuracy
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
