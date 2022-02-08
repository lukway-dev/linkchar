import { Suspense, lazy, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Title from '../components/Title'
import Loading from '../components/Loading'
import '../styles/containers/ContinueWatching.sass'

const Movie = lazy(() =>import('../components/Movie'))

const ContinueWatching = () => {
  const { userData } = useContext(AppContext)

  if(userData.watching) return (
    <div className='ContinueWatching'>
      <Title>Continue Watching</Title>
      <div className="ContinueWatching__Movies">
        {userData.watching.map(item =>
          <Suspense key={`Watching-Movie-${item.title}`} fallback={<Loading/>}>
            <Movie {...item}/>
          </Suspense>
        )}
      </div>
    </div>
  )

  return null
}

export default ContinueWatching