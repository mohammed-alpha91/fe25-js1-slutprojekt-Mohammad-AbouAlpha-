const API_KEY = "d8d0dd2caefb015e2e6d97cabf88a080";

const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

// Hämta Top 10 Top Rated Movies från api från axios bibliotek
export async function fetchTop10() {
  try {
    const response = await axios.get(topRatedUrl);
    return response.data.results.slice(0, 10);
  } catch (error) {
    alert("Failed to fetch Top Rated Movies. Please check your internet connection or try again later.");
    return [];
  }
}

// Hämta Top 10 Popular Movies från api
export async function fetchTop10Popular() {
  try {
    const response = await axios.get(popularUrl);
    return response.data.results.slice(0, 10);
  } catch (error) {
    alert("Failed to fetch Popular Movies. Please check your internet connection or try again later.");
    return [];
  }
}

// Sök filmer baserat på text input
export async function searchMovies(searchText) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchText)}&page=1`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    alert(`Failed to search for movies with the keyword "${searchText}". Please check your internet connection or try again.`);
    return [];
  }
}

// Sök personer baserat på text input
export async function searchPeople(searchText) {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(searchText)}&page=1`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    alert(`Failed to search for people with the keyword "${searchText}". Please check your internet connection or try again.`);
    return [];
  }
}
