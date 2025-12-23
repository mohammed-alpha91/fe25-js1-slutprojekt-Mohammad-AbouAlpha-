import {
  fetchTop10,
  fetchTop10Popular,
  searchMovies,
  searchPeople,
} from "./api.js";

import {
  renderMovieList,
  renderMovieListWithOverview,
  renderPeopleList,
} from "./render.js";

import { addToWatchlist, renderWatchlist } from "./watchlist.js";

// DOM-element
const top10RankedLink = document.getElementById("top10Ranked");
const top10PopularLink = document.getElementById("top10Popular");
const searchMoviesForm = document.getElementById("searchForm");
const searchMoviesInput = document.getElementById("searchMovieInput");
const searchPeopleForm = document.getElementById("searchPeopleForm");
const searchPeopleInput = document.getElementById("searchPeopleInput");
const content = document.getElementById("content");
const sortSelect = document.getElementById("sortSelect");

let currentMovies = [];

// -----------------------------
// Eventhantering

// Top 10 Ranked
top10RankedLink.addEventListener("click", async (e) => {
  e.preventDefault();
  content.innerHTML = "";

  try {
    if (!navigator.onLine) throw new Error("You are offline.");

    const movies = await fetchTop10();
    renderMovieList(movies);

        // Lägger till klick-event på varje film för att kunna spara den i watchlist
    const movieDivs = document.querySelectorAll(".movie");
    movieDivs.forEach((div, index) => {
      div.addEventListener("click", () => addToWatchlist(movies[index]));
    });
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

// Top 10 Popular
top10PopularLink.addEventListener("click", async (e) => {
  e.preventDefault();
  content.innerHTML = "";

  try {
    if (!navigator.onLine) throw new Error("You are offline.");

    const movies = await fetchTop10Popular();
    renderMovieList(movies);
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

// Sök filmer
searchMoviesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  content.innerHTML = "";

  const searchInput = searchMoviesInput.value.trim();
  if (!searchInput) {
    content.innerHTML = `<p class="error">Enter a search term first.</p>`;
    return;
  }

  try {
    if (!navigator.onLine) throw new Error("You are offline.");

    currentMovies = await searchMovies(searchInput);
    if (currentMovies.length === 0) {
      content.innerHTML = `<p class="error">No movies found.</p>`;
      return;
    }
    renderSortedMovies();
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

// Sök personer
searchPeopleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  content.innerHTML = "";

  const searchText = searchPeopleInput.value.trim();
  if (!searchText) {
    content.innerHTML = `<p class="error">Fill in a name first.</p>`;
    return;
  }

  try {
    if (!navigator.onLine) throw new Error("You are offline.");

    const people = await searchPeople(searchText);
    if (people.length === 0) {
      content.innerHTML = `<p class="error">No person found.</p>`;
      return;
    }
    renderPeopleList(people);
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
});

// Sortera filmer
sortSelect.addEventListener("change", () => {
  if (currentMovies.length === 0) return;
  renderSortedMovies();
});

function renderSortedMovies() {
  let sortedMovies = [...currentMovies];
  const sortValue = sortSelect.value;

  if (sortValue === "newest") {
    sortedMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  } else if (sortValue === "oldest") {
    sortedMovies.sort(
      (a, b) => new Date(a.release_date) - new Date(b.release_date)
    );
  } else if (sortValue === "title") {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderMovieListWithOverview(sortedMovies);
}
// Renderar watchlist direkt när sidan laddas och visar sparade filmer från localStorage
renderWatchlist();