import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import PlayIcon from '../assets/icons/play-icon.svg'
import InfoIcon from '../assets/icons/info-icon.svg'
import CloseIcon from '../assets/icons/close-icon.svg'
import ViewsIcon from '../assets/icons/views-icon.svg'
import LikeWhiteIcon from '../assets/icons/like-white-icon.svg'
import LikeRedIcon from '../assets/icons/like-red-icon.svg'
import BackgroundImage from '../assets/images/movie-background.png'
import '../styles/components/Movie.sass'
import { addFavMovie, getUserFavMovies, removeFavMovie } from '../database/firebase'

const Movie = (movie) => {
  const { id, title, description, image, views, country, time } = movie

  const [ showDescription, setShowDescription ] = useState(false)
  const [ isLiked, setIsLiked ] = useState(false)
  const { userId, userData, setUserData } = useContext(AppContext)
  const navigate = useNavigate()

  const handleShowDescription = () => {
    setShowDescription(!showDescription)
  }

  const handleLike = () => {
    if(!isLiked) {
      setIsLiked(true)

      if(!userData.favMovies) {
        setUserData({
          ...userData,
          favMovies: [ movie ]
        })
      } else {
        setUserData({
          ...userData,
          favMovies: [
            ...userData.favMovies,
            movie
          ]
        })
      }

      addFavMovie(movie, userId)
    } else {
      setIsLiked(false)

      setUserData({
        ...userData,
        favMovies: userData.favMovies.filter(item => item !== movie)
      })

      removeFavMovie(movie, userId)
    }
  }

  const handlePlay = () => {
    if(userData.watching) {
      setUserData({
        ...userData,
        watching: [
          ...userData.watching,
          movie
        ]
      })
    } else {
      setUserData({
        ...userData,
        watching: [ movie ]
      })
    }

    navigate(`/movie/${id}`)
  }

  useEffect(() => {
    const getData = () => {
      setTimeout(async () => {
        const data = await getUserFavMovies(userId)

        const movieIsLiked = data.filter(item => item.title === title)

        if(movieIsLiked.length > 0) setIsLiked(true)
      }, 5000)
    }

    getData()
  }, [])

  return (
    <div className="Movie">
      {showDescription
        ? <div className="Movie__Description-Container">
          <h3 className='Movie__Description-Title'>
            {title}
          </h3>
          <span className="Movie__Country">Country: {country}</span>
          <p className="Movie__Description">{description}</p>
          <button className="Movie__Close" onClick={handleShowDescription}>
            <img className='Movie__Close-Icon' src={CloseIcon} alt="" />
          </button>
        </div>
        : <>
          <div className="Movie__Controls">
            <button className="Movie__Play-Button" onClick={handlePlay}>
              <img className='Movie__Controls-Icon' src={PlayIcon} alt="" />
            </button>

            <div className="Movie__Data">
              <h3 className='Movie__Title'>
                {title}
              </h3>
              <span className='Movie__Time'>{time}</span>
            </div>

            <button className='Movie__Info-Button' onClick={handleShowDescription}>
              <img className='Movie__Controls-Icon' src={InfoIcon} alt="Information" />
            </button>
          </div>
          <span className="Movie__Views">
            <img className='Movie__Views-Icon' src={ViewsIcon} alt="Views" loading="lazy"/>
            {views}
          </span>
          <button className="Movie__Like" onClick={handleLike}>
            <img className='Movie__Like-Icon' src={isLiked ? LikeRedIcon : LikeWhiteIcon}/>
          </button>
        </>
      }

      <img className='Movie__Image' src={image || BackgroundImage} alt="" />
    </div>
  )
}

export default Movie