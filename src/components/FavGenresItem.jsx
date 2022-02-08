import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { addFavGenre, removeFavGenre } from '../database/firebase'
import getGenreColor from '../utils/getGenreColor'
import DeleteIcon from '../assets/icons/delete-icon.svg'
import '../styles/components/FavGenresItem.sass'
import { Link } from 'react-router-dom'

const FavGenresItem = ({ genre, deleteButton = false, link = false }) => {
  const [ active, setActive ] = useState(false)
  const { userId, userData, setUserData } = useContext(AppContext)

  const handleAddFavGenre = async () => {
    await addFavGenre(genre, userId)
    setActive(true)
    let favGenres

    if(!userData.favGenre) {
      favGenres = [ genre ]
    } else {
      favGenres = [
        ...userData.favGenres,
        genre
      ]
    }

    favGenres.sort()

    setUserData({
      ...userData,
      favGenres
    })
  }

  const handleRemoveFavGenre = async () => {
    await removeFavGenre(genre, userId)
    !deleteButton && setActive(false)

    setUserData({
      ...userData,
      favGenres: userData.favGenres.filter(item => item !== genre)
    })
  }

  useEffect(() => {
    const isActive = userData.favGenres?.includes(genre)
    isActive && setActive(isActive)
  }, [userData])

  const color = getGenreColor(genre)
  const colorClassName = `FavGenresItem-${color}`

  if(deleteButton) return (
    <div
      className={`${active ? `${colorClassName}--Active` : colorClassName}`}
      onClick={active ? handleRemoveFavGenre : handleAddFavGenre}
    >
      { genre }
      <button className="FavGenresItem__Delete-Button" onClick={handleRemoveFavGenre}>
        <img
          className='FavGenresItem__Delete-Icon'
          src={DeleteIcon}
          alt={`Delete ${genre}`}
          title={`Delete ${genre}`}
        />
      </button>
    </div>
  )

  if(link) return (
    <Link
      className={`${active ? `${colorClassName}--Active` : colorClassName}`}
      to={`/genre/${genre.toLowerCase()}`}
    >
      { genre }
    </Link>
  )

  return (
    <button
      className={`${active ? `${colorClassName}--Active` : colorClassName}`}
      onClick={active ? handleRemoveFavGenre : handleAddFavGenre}
    >
      { genre }
    </button>
  )
}

export default FavGenresItem