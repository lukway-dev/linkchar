import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Helmet from 'react-helmet'
import Loading from '../components/Loading'
import { getPopularMovies } from '../api/api'
import '../styles/pages/Popular.sass'

const Movie = lazy(() => import('../components/Movie'))

const Popular = () => {
  const [ movies, setMovies ] = useState([])
  const loaderRef = useRef(null)

  useEffect(async () => {
    const getData = async () => {
      let page = Math.floor((movies.length / 20) + 1) || 1
      let existData = movies.length !== 0

      const data = await getPopularMovies(page)

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
        <title>Popular</title>
      </Helmet>

      <main className="Popular">
        {movies.length > 0 &&
          <div className="Popular__Movies-Container">
            {movies?.map(item =>
              <Suspense key={`Popular-Movie-${item.id}`} fallback={<Loading/>}>
                <Movie {...item}/>
              </Suspense>
            )}
            <div className="Popular__Loader" ref={loaderRef}></div>
          </div>
        }
      </main>
    </>
  )
}

export default Popular