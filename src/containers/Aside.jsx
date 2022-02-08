import News from './News'
import FavoriteGenres from './FavoriteGenres'
import '../styles/containers/Aside.sass'

const Aside = () => {
  return (
    <aside className="Aside">
      <News/>
      <FavoriteGenres/>
    </aside>
  )
}

export default Aside