import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { getMovieGenres } from '../api/api'
import { addFavGenre } from '../database/firebase'
import Title from '../components/Title'
import AddIcon from '../assets/icons/add-icon.svg'
import FavGenresItem from '../components/FavGenresItem'
import '../styles/containers/FavoriteGenres.sass'

const FavoriteGenres = () => {
  const [ addGenres, setAddGenres ] = useState([])
  const { userId, userData, setUserData } = useContext(AppContext)

  useEffect(() => {
    const getData = async () => {
      const genres = await getMovieGenres()

      const availableGenres = genres.filter(item => !userData.favGenres?.includes(item.name))

      const genresToShow = availableGenres.sort((a, b) => ( 0.5 - Math.random())).slice(0,2)

      setAddGenres(genresToShow)
    }

    getData()
  }, [userData])


  const handleAddFavGenre = async (genre) => {
    await addFavGenre(genre, userId)

    const favGenres = [
      ...userData.favGenres,
      genre
    ]
    favGenres.sort()

    setUserData({
      ...userData,
      favGenres
    })
  }

  return (
    <div className="Favorites">
      <Title>Favourite genres</Title>

      <div className="Favorites__Items-Container">
        {userData.favGenres?.map((item, index) => {
          if(index < 5) {
            return <FavGenresItem key={`Aside-Genre-Item-${item}`} genre={item} link={true}/>
          }
          if(index === 5) {
            return <Link key='Aside-Genre-Item-See-More' className="Favorites__See-More" to="/profile">See more...</Link>
          }
        })}
      </div>

      <div className="Favorites__Add-Caption">
        <img className='Favorites__Add-Icon' src={AddIcon} alt="Add" />
        Add your favorite genres
      </div>

      <div className="Favorites__Add-Items-Container">
        {addGenres?.map(item =>
          <button
            key={`Aside-Add-Genre-Item-${item.name}`}
            className='Favorites__Add-Item'
            onClick={() => handleAddFavGenre(item.name)}
          >
            {item.name}
          </button>
        )}
      </div>
    </div>
  )
}

export default FavoriteGenres