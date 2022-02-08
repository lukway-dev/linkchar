import { NavLink } from 'react-router-dom'
import Logo from '../assets/images/logo.svg'
import Blob from '../assets/images/link-blob.svg'
import '../styles/components/Navbar.sass'

const Navbar = () => {
  const paths = [
    {
      name: 'Movies',
      path: '/movies'
    }, {
      name: 'Animations',
      path: '/genre/animation'
    }, {
      name: 'Popular',
      path: '/popular'
    }
  ]

  return (
    <nav className="Navbar">
      <img className="Navbar__Logo" src={Logo} alt="LinkChar"/>
      <div className="Navbar__Links-Container">

        {paths.map(item => (
          <NavLink
            key={`NavLink--${item.name}`}
            className={(item) => item.isActive ? 'Navbar__Link--Active' : 'Navbar__Link'}
            to={item.path}
          >
            {item.name}
            <img className='Navbar__Blob' src={Blob} />
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar