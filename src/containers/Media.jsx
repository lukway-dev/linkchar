import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import Loading from '../components/Loading'
import ArrowIcon from '../assets/icons/arrow-bottom-icon.svg'
import '../styles/containers/Media.sass'

const Movie = lazy(() => import('../components/Movie'))

const Media = ({ name, movies }) => {
  return (
    <section className='Media'>
      <div className="Media__Title-Container">
        <Title>{name}</Title>
        {name !== 'Popular Movies'
          ? <div>
            <Link className="Media__Link" to={`/genre/${name.toLowerCase()}`}>All movies</Link>
            <img
              className='Media__Link-Icon'
              src={ArrowIcon}
              title='Profile'
            />
          </div>
          : <div>
            <Link className="Media__Link" to={'/popular'}>All movies</Link>
            <img
              className='Media__Link-Icon'
              src={ArrowIcon}
              title='Profile'
            />
          </div>
        }
      </div>

      <div className="Media__Movies-Container">
        {movies.map(item => (
          <Suspense
            key={`Media-Movie-${item.id}`}
            fallback={
              <>
                <Loading/>
                <Loading/>
                <Loading/>
              </>
            }
          >
            <Movie {...item}/>
          </Suspense>
        ))}
      </div>
    </section>
  )
}

export default Media