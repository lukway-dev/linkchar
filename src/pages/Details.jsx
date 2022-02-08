import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import Title from '../components/Title'
import { getMovieById } from '../api/api'
import '../styles/pages/Details.sass'

const Details = () => {
  const [ movie, setMovie ] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieById(id)
      setMovie(data)
    }

    getData()
  }, [])

  return (
    <>
      <Helmet>
        <title>{movie.title}</title>
      </Helmet>

      <main className="Details">
        <div className="Details__Data">
          <img className="Details__Poster" src={movie.poster} alt=""/>

          <div className="Details__Items-Container">
            <div className="Details__Item">
              <span className='Details__Item-Name'>Name: </span>
              <span className='Details__Item-Value'>{movie.title}</span>
            </div>
            <div className="Details__Item">
              <span className='Details__Item-Name'>Time: </span>
              <span className='Details__Item-Value'>{movie.time}</span>
            </div>
            <div className="Details__Item">
              <span className='Details__Item-Name'>Rate: </span>
              <span className='Details__Item-Value'>{movie.rate}</span>
            </div>
            <div className="Details__Item">
              <span className='Details__Item-Name'>Country: </span>
              <span className='Details__Item-Value'>{movie.country}</span>
            </div>
            <div className="Details__Item">
              <span className='Details__Item-Name'>Views: </span>
              <span className='Details__Item-Value'>{movie.views}</span>
            </div>
          </div>
        </div>

        <div className="Details__Description-Container">
          <Title>Description:</Title>
          <p className="Details__Description">
            {movie.description}
          </p>
        </div>
      </main>
    </>
  )
}

export default Details