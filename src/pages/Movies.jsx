import { Helmet } from 'react-helmet'
import Aside from '../containers/Aside'
import Main from '../containers/Main'

const Movies = () => {
  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>
      <Aside/>
      <Main/>
    </>
  )
}

export default Movies