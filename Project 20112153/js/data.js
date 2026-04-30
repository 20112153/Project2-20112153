const STORAGE_KEY = 'exerciseData';
const NEW_ITEM_KEY = 'latestExerciseId';
let exercises = [];
let newestExerciseId = null;
let searchDifficulty = '';
let sortAscending = false;

const defaultExercises = [
  { id: 1, exercise: 'Bench Press', rating: 8, weight: 80, reps: 8, sets: 4, difficulty: 'Intermediate', createdAt: 1680000000000 },
  { id: 2, exercise: 'Pullups', rating: 9, weight: 0, reps: 10, sets: 4, difficulty: 'Hard', createdAt: 1680000001000 },
  { id: 3, exercise: 'Preacher Curl', rating: 7, weight: 30, reps: 12, sets: 3, difficulty: 'Intermediate', createdAt: 1680000002000 },
  { id: 4, exercise: 'Squat', rating: 9, weight: 100, reps: 5, sets: 5, difficulty: 'Hard', createdAt: 1680000003000 },
  { id: 5, exercise: 'Deadlift', rating: 10, weight: 120, reps: 3, sets: 5, difficulty: 'Expert', createdAt: 1680000004000 },
  { id: 6, exercise: 'Plank', rating: 6, weight: 0, reps: 60, sets: 3, difficulty: 'Easy', createdAt: 1680000005000 }
];

function loadExercises() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const storedNewest = localStorage.getItem(NEW_ITEM_KEY);
  exercises = stored ? JSON.parse(stored) : defaultExercises.slice();
  newestExerciseId = storedNewest ? Number(storedNewest) : null;
}

function saveExercises() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  if (newestExerciseId !== null) {
    localStorage.setItem(NEW_ITEM_KEY, String(newestExerciseId));
  }
}

function getFilteredAndSortedExercises() {
  let result = exercises.slice();
  if (searchDifficulty.trim()) {
    const needle = searchDifficulty.trim().toLowerCase();
    result = result.filter(item => item.difficulty.toLowerCase().includes(needle));
  }
  result.sort((a, b) => {
    if (sortAscending) {
      return a.rating - b.rating;
    }
    return b.rating - a.rating;
  });
  return result.map(item => ({
    ...item,
    isNewest: item.id === newestExerciseId
  }));
}

function renderExercises() {
  const source = document.getElementById('exercise-table-template').innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ items: getFilteredAndSortedExercises(), sortAscending });
  document.getElementById('exercise-table-container').innerHTML = html;
}

function strictNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function addExercise(event) {
  event.preventDefault();
  const form = event.target;
  const exerciseValue = form.elements.exercise.value.trim();
  const ratingValue = strictNumber(form.elements.rating.value, null);
  const weightValue = strictNumber(form.elements.weight.value, 0);
  const repsValue = strictNumber(form.elements.reps.value, 0);
  const setsValue = strictNumber(form.elements.sets.value, 0);
  const difficultyValue = form.elements.difficulty.value.trim();

  if (!exerciseValue || !difficultyValue || ratingValue === null) {
    alert('Please enter exercise name, difficulty and rating.');
    return;
  }

  const id = Date.now();
  const newItem = {
    id,
    exercise: exerciseValue,
    rating: ratingValue,
    weight: weightValue,
    reps: repsValue,
    sets: setsValue,
    difficulty: difficultyValue,
    createdAt: Date.now()
  };

  exercises.push(newItem);
  newestExerciseId = id;
  saveExercises();
  renderExercises();
  form.reset();
  document.getElementById('difficulty-search').value = '';
}

function removeExercise(id) {
  exercises = exercises.filter(item => item.id !== id);
  if (id === newestExerciseId) {
    newestExerciseId = exercises.length ? exercises[exercises.length - 1].id : null;
  }
  saveExercises();
  renderExercises();
}

function setupHandlers() {
  const form = document.getElementById('exercise-form');
  const searchInput = document.getElementById('difficulty-search');
  const searchButton = document.getElementById('search-button');
  const resetButton = document.getElementById('reset-search');
  const sortButton = document.getElementById('sort-button');
  const tableContainer = document.getElementById('exercise-table-container');

  form.addEventListener('submit', addExercise);
  searchInput.addEventListener('input', function(event) {
    searchDifficulty = event.target.value;
    renderExercises();
  });
  searchButton.addEventListener('click', function() {
    searchDifficulty = searchInput.value;
    renderExercises();
  });
  resetButton.addEventListener('click', function() {
    searchDifficulty = '';
    searchInput.value = '';
    renderExercises();
  });

  sortButton.addEventListener('click', function() {
    sortAscending = !sortAscending;
    sortButton.textContent = sortAscending ? 'Sort by rating ↑' : 'Sort by rating ↓';
    renderExercises();
  });

  tableContainer.addEventListener('click', function(event) {
    if (event.target.matches('.remove-exercise')) {
      const id = Number(event.target.dataset.id);
      removeExercise(id);
    }
  });
}

function initExercisePage() {
  loadExercises();
  setupHandlers();
  renderExercises();
}

document.addEventListener('DOMContentLoaded', initExercisePage);
