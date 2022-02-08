import axios from 'axios'
import { startCase } from 'lodash'

const baseURL = 'http://image.tmdb.org/t/p'
const API_Key = 'e153d85ec4e1e07c1924d644adcc441c'

const normalizeData = async (items, image_type = '/w500') => {
  const getExtraData = async (id) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`)
    const time = data.runtime

    const normalizeTime = `${Math.floor(time / 60)}:${time % 60}hs`

    return {
      country: data.production_countries[0]?.name || null,
      time: normalizeTime || null
    }
  }

  if(items.length) {
    const normalizedData = await Promise.all(items.map(async (item) => {
      const { country, time } = await getExtraData(item.id)
      let views = item.popularity.toString().replace('.', '').split('')

      if(views.length > 4) views.splice(-3, 0, '.')
      if(views.length > 7) views.splice(-7, 0, '.')

      views = views.join('')

      return ({
        id: item.id,
        title: item.title || item.name,
        description: item.overview,
        image: item.backdrop_path ? `${baseURL}${image_type}${item.backdrop_path}` : null,
        poster: item.poster_path ? `${baseURL}${image_type}${item.poster_path}` : null,
        views,
        country,
        time,
        rate: item.vote_average || null
      })
    }))

    return normalizedData
  } else {
    const { country, time } = await getExtraData(items.id)
    let views = items.popularity.toString().replace('.', '').split('')

    if(views.length > 4) views.splice(-3, 0, '.')
    if(views.length > 7) views.splice(-7, 0, '.')

    views = views.join('')

    const normalizedData = {
      id: items.id,
      title: items.title || items.name,
      description: items.overview,
      image: `${baseURL}${image_type}${items.backdrop_path}`,
      poster: `${baseURL}${image_type}${items.poster_path}`,
      views,
      country,
      time,
      rate: items.vote_average || null
    }

    return normalizedData
  }

}

export const getMovieById = async (id) => {
  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`

  const { data } = await axios.get(URL)

  return await normalizeData(data)
}

export const getNewsMovies = async () => {
  const URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_Key}&language=en-US&page=1`

  const { data } = await axios.get(URL)
  const movies = data.results

  return await normalizeData(movies)
}

export const discoverMovies = async () => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`)
  const movies = data.results

  const normalizedData = await normalizeData(movies, '/w1280')

  const randomMovie = Math.floor(Math.random() * 20)

  return normalizedData[randomMovie]
}

export const getAllMoviesByGenre = async () => {
  const genres = await getMovieGenres()

  const movies = await Promise.all(genres.map(async (item) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${item.id}`
    const { data } = await axios.get(URL)

    const movies = data.results

    const normalizedData = await normalizeData(movies)

    return {
      name: item.name,
      movies: [
        ...normalizedData.slice(0, 10)
      ]
    }
  }))

  movies.sort((a, b) => ( 0.5 - Math.random()))

  let popularMovies = await getPopularMovies(1)
  popularMovies = {
    name: 'Popular Movies',
    movies: [
      ...popularMovies.slice(0, 10)
    ]
  }

  movies.unshift(popularMovies)

  return movies
}

export const getMoviesByGenre = async (genre, page) => {
  const genres = await getMovieGenres()
  let genreName = startCase(genre)

  if(genre === 'tv movie') genreName = 'TV Movie'

  const genreItem = genres.filter(item => item.name === genreName)

  const { id } = genreItem[0]

  const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${id}`
  const { data } = await axios.get(URL)
  const movies = data.results

  return await normalizeData(movies)
}

export const getMovieGenres = async () => {
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}&language=en-US`
  const { data } = await axios.get(URL)

  return data.genres
}

export const getPopularMovies = async (page) => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=${page}`
  const { data } = await axios.get(URL)
  const movies = data.results

  return await normalizeData(movies)
}

export const searchMovie = async (keyword, page) => {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=${keyword}&page=${page}&include_adult=false`

  const { data } = await axios.get(URL)
  const movies = data.results

  return await normalizeData(movies)
}