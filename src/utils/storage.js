const STORAGE_KEY = "flashcard_cards";

export const loadFlashcards = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading flashcards", error);
    return [];
  }
};

export const saveFlashcards = (flashcards) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch (error) {
    console.error("Error saving flashcards", error);
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing the data", error);
  }
};
