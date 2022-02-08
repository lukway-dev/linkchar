import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { startCase } from 'lodash'
import { getMoviesByGenre } from '../api/api'
import Loading from '../components/Loading'
import '../styles/pages/Genre.sass'

const Movie = lazy(() => import('../components/Movie'))

const Genre = () => {
  const [ movies, setMovies ] = useState([])
  const loaderRef = useRef(null)
  const { genre } = useParams()
  const capitalizeGenre = startCase(genre)

  useEffect(async () => {
    const getData = async () => {
      let page = Math.floor((movies.length / 20) + 1) || 1
      let existData = movies.length !== 0

      const data = await getMoviesByGenre(genre, page)

      if(!existData) {
        setMovies(data)
      } else {
        setMovies([ ...movies, ...data ])
      }
    }

    const loadMoreMovies = async (entries, observer) => {
      const [ entry ] = entries

      if(entry.isIntersecting) {
        await getData()
        observer.disconnect()
      }
    }

    const observer = new IntersectionObserver(loadMoreMovies, {
      rootMargin: '800px',
    })
    if(loaderRef.current) observer.observe(loaderRef.current)

    if(movies.length === 0) await getData()

    return () => observer.disconnect()
  })

  return (
    <>
      <Helmet>
        <title>Movies: {capitalizeGenre}</title>
      </Helmet>

      <div className="Genre">
        <h2 className='Genre__Title'>{capitalizeGenre}</h2>
        <div className="Genre__Movies-Container">
          {movies?.map(item =>
            <Suspense key={`Genre-Movie-${item.id}`} fallback={<Loading/>}>
              <Movie {...item}/>
            </Suspense>
          )}
          <div className="Genre__Loader" ref={loaderRef}></div>
        </div>
      </div>
    </>
  )
}

export default Genre