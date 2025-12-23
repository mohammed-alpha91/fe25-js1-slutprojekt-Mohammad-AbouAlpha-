// Rendera en lista med filmer /utan översikt
export function renderMovieList(movies) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const title = document.createElement("h2");
    title.textContent = `${movie.title} (${movie.release_date})`;

    div.append(img, title);
    content.appendChild(div);
  });
}

// funktion för rendera filmer med översikt
export function renderMovieListWithOverview(movies) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");

    const img = document.createElement("img");
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";

    const title = document.createElement("h2");
    title.textContent = `${movie.title} (${movie.release_date})`;

    const overview = document.createElement("p");
    overview.textContent = movie.overview;

    div.append(img, title, overview);
    content.appendChild(div);
  });
}

// funktion för rendera personer
export function renderPeopleList(people) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  people.forEach((person) => {
    const div = document.createElement("div");
    div.classList.add("person");

    const img = document.createElement("img");
    img.src = person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : "";

    const name = document.createElement("h2");
    name.textContent = person.name;

    const department = document.createElement("p");
    department.textContent = `Known for: ${person.known_for_department}`;

    const knownForList = document.createElement("ul");
    person.known_for.slice(0, 3).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.media_type === "movie" ? "Movie" : "TV"}: ${item.title || item.name}`;
      knownForList.appendChild(li);
    });

    div.append(img, name, department, knownForList);
    content.appendChild(div);
  });
}
