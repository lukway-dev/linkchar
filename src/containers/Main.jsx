import { useState, useEffect } from 'react'
import { getAllMoviesByGenre } from '../api/api'
import Banner from '../components/Banner'
import Media from './Media'
import ContinueWatching from './ContinueWatching'
import '../styles/containers/Main.sass'


const Main = () => {
  const [ genres, setGenres ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getAllMoviesByGenre()
      setGenres(data)
    }

    getData()
  }, [])

  return (
    <main className='Main'>
      <Banner/>
      <ContinueWatching/>
      {genres.map(genre => (
        <Media
          key={`Genre-${genre.name}`}
          name={genre.name}
          movies={genre.movies}
        />
      ))}
    </main>
  )
}

export default Main