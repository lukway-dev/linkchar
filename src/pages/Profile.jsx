import { lazy, Suspense, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Title from '../components/Title'
import FavGenresItem from '../components/FavGenresItem'
import Loading from '../components/Loading'
import '../styles/pages/Profile.sass'

const Movie = lazy(() => import('../components/Movie'))

const Profile = () => {
  const { userData } = useContext(AppContext)

  return (
    <main className="Profile">
      <img className="Profile__Image" src={userData.image} alt={userData.username}/>
      <h1 className='Profile__Title'>{userData.username}</h1>
      {userData.favGenres && (
        <div className="Profile__Genres">
          <Title>Your favorites genres</Title>
          <div className="Profile__Genres-Container">
            {userData.favGenres.map((item) => (
              <FavGenresItem key={`Profile-Genre-Item-${item}`} genre={item} deleteButton={true}/>
            ))}
          </div>
        </div>
      )}
      {userData.favMovies && (
        <div className="Profile__Movies">
          <Title>Your favorites movies</Title>
          <div className="Profile__Movies-Container">
            {userData.favMovies?.map((item) => (
              <Suspense key={`$Profile-Movie-Item-${item.title}`} fallback={<Loading/>}>
                <Movie {...item}/>
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default Profile