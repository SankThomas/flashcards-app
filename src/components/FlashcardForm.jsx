import { useState } from "react";
import { Save, X } from "lucide-react";

export default function FlashcardForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing,
}) {
  const [front, setFront] = useState(initialData?.front || "");
  const [back, setBack] = useState(initialData?.back || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      onSubmit({
        front: front.trim(),
        back: back.trim(),
        category: category.trim() || "General",
      });

      if (!isEditing) {
        setFront("");
        setBack("");
        setCategory("");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Flashcard" : "Create New Flashcard"}
          </h2>

          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category (optional)
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              placeholder="e.g Maths, Science, History, Geography"
            />
          </div>

          <div>
            <label
              htmlFor="front"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Question / Front of card *
            </label>
            <textarea
              type="text"
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
              placeholder="Enter your question for the front of the flashcard"
              required
            />
          </div>

          <div>
            <label
              htmlFor="back"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Answer / Back of card *
            </label>
            <textarea
              type="text"
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
              placeholder="Enter the answer for the back of the flashcard"
              required
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 w-full text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 w-full text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors font-medium sm:w-auto"
            >
              <Save className="size-4" />
              <span>{isEditing ? "Update" : "Create"} Flashcard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
