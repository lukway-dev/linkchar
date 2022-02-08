import Header from '../containers/Header'
import '../styles/layout/Grid.sass'

const Grid = ({ children }) => (
  <div className="Grid">
    <Header/>
    { children }
  </div>
)

export default Grid