
// Hämtar watchlist från localStorage
export function getWatchlist() {
  const list = localStorage.getItem("watchlist");
  return list ? JSON.parse(list) : [];
}

// Sparar listan till localStorage
export function saveWatchlist(list) {
  localStorage.setItem("watchlist", JSON.stringify(list));
}

// Lägg till film i watchlist om den inte redan finns
export function addToWatchlist(movie) {
  const watchlist = getWatchlist();
  if (!watchlist.some(item => item.id === movie.id)) {  // Förhindrar dubletter i watchlist
    watchlist.push(movie);
    saveWatchlist(watchlist);
    renderWatchlist();    // Uppdatera watchlist/DOM efter ändring
  }
}

// Tar bort film från watchlist baserat på id
export function removeFromWatchlist(movieId) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter(item => item.id !== movieId);
  saveWatchlist(watchlist);
  renderWatchlist();
}

// Rendera watchlist 
export function renderWatchlist() {
  const container = document.getElementById("watchlist");
  const watchlist = getWatchlist();
  container.innerHTML = "";

  watchlist.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("watchlist-item");

    const title = document.createElement("h4");
    title.textContent = movie.title;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    img.alt = movie.title;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
     // Tar bort film från listan vid klick
    btn.addEventListener("click", () => removeFromWatchlist(movie.id));

    div.append(title, img, btn);
    container.appendChild(div);
  });
}
