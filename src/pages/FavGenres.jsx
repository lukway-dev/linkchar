import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovieGenres } from '../api/api'
import FavGenresItem from '../components/FavGenresItem'
import Title from '../components/Title'
import { AppContext } from '../context/AppContext'
import '../styles/pages/FavGenres.sass'

const FavGenres = () => {
  const [ genres, setGenres ] = useState([])
  const { userData } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieGenres()
      setGenres(data)
    }

    getData()
  }, [])

  const handleContinue = () => {
    navigate('/movies')
  }

  return (
    <div className="FavGenres">
      <div className="FavGenres__Card">
        <Title>Please, select your <br/> favorites genres for a better experience</Title>
        <div className="FavGenres__Items-Container">
          {genres.map(item =>
            <FavGenresItem key={`FavGenres-${item.name}`} genre={item.name}/>
          )}
        </div>

        {userData.favGenres?.length > 0
          ? <button className="FavGenres__Button" onClick={handleContinue}>Continue</button>
          : <button className="FavGenres__Button--Disabled" disabled>Continue</button>
        }
      </div>
    </div>
  )
}

export default FavGenres