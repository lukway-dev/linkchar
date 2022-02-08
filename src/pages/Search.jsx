import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import Loading from '../components/Loading'
import Title from '../components/Title'
import { searchMovie } from '../api/api'
import '../styles/pages/Search.sass'

const Movie = lazy(() => import('../components/Movie'))

const Search = () => {
  const [ movies, setMovies ] = useState([])
  const [ currentKeyword, setCurrentKeyword ] = useState('')
  const loaderRef = useRef(null)
  const { keyword } = useParams()

  useEffect(async () => {
    const getData = async () => {
      let page = Math.floor((movies.length / 20) + 1) || 1
      let existData = movies.length !== 0

      if(keyword !== currentKeyword) {
        page = 1
        existData = false
      }

      const data = await searchMovie(keyword, page)

      if(!existData) {
        setMovies(data)
      } else {
        setMovies([ ...movies, ...data ])
      }

      setCurrentKeyword(keyword)
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

  useEffect(() => {
    setMovies([])
  }, [keyword])

  return (
    <>
      <Helmet>
        <title>Search: {keyword}</title>
      </Helmet>

      <main className="Search">
        {movies.length > 0
          ?
          <div className="Search__Movies-Container">
            {movies.map(item =>
              <Suspense key={`Search-Movie-${item.id}`} fallback={<Loading/>}>
                <Movie {...item}/>
              </Suspense>
            )}
            <div className="Search__Loader" ref={loaderRef}></div>
          </div>
          : <Title>Sorry, we couldn't find your movie</Title>
        }
      </main>
    </>
  )
}

export default Search