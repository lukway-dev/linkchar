import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { discoverMovies } from '../api/api'
import PlayIcon from '../assets/icons/play-icon.svg'
import '../styles/components/Banner.sass'

const Banner = () => {
  const [ movie, setMovie ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const movie = await discoverMovies()
      setMovie(movie)
    }

    getData()
  }, [])

  const goToMovie = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className="Banner">
      {movie && (
        <>
          <img
            className='Banner__Image'
            src={movie.image}
            alt={movie.title}
            title={movie.title}
          />
          <button className="Banner__Button" onClick={goToMovie}>
            <div className="Banner__Play-Container">
              <img
                className='Banner__Play-Icon'
                src={PlayIcon}
                alt='Watch Now'
                title='Watch Now'
              />
            </div>
            Watch Now
          </button>
          <h2 className="Banner__Title">
            {movie.title}
          </h2>
        </>
      )}
    </div>
  )
}

export default Banner