import Navbar from '../components/Navbar'
import Actions from '../components/Actions'
import '../styles/containers/Header.sass'

const Header = () => {
  return (
    <header className='Header'>
      <Navbar/>
      <Actions/>
    </header>
  )
}

export default Header