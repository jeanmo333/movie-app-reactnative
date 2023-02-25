import {API_HOST, API_KEY, LANG} from '../utils/constants';

export async function getNewsMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function getGenreMovieApi(idGenres) {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&lenguage=${LANG}`;

  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    const arrayGenres = [];
    idGenres.forEach(id => {
      result_1.genres.forEach(item => {
        if (item.id === id) arrayGenres.push(item.name);
      });
    });
    return arrayGenres;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllGenresApi() {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function getGenreMoviesApi(idGenres) {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieByIdApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function getVideoMovieApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function getPopularMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}

export async function searchMoviesApi(search) {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;
  try {
    const response = await fetch(url);
    const result_1 = await response.json();
    return result_1;
  } catch (error) {
    console.log(error);
  }
}
