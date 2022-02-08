import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { signIn } from '../database/firebase'
import Logo from '../assets/images/logo.svg'
import GoogleIcon from '../assets/icons/google-icon.svg'
import PageIcon from '../assets/icons/page-icon.svg'
import '../styles/pages/Login.sass'

const Login = () => {
  const navigate = useNavigate()
  const { saveUserId, setUserData } = useContext(AppContext)

  const handleSignIn = async () => {
    const { userId, userData } = await signIn()

    if(userData.favGenres.length > 0) {
      saveUserId(userId)
      setUserData(userData)
      navigate('/movies')
    } else {
      saveUserId(userId)
      setUserData(userData)
      navigate('/favorites_genres')
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className='Login'>
        <div className="Login__Card">
          <img className='Login__Logo' src={Logo} alt="Linkchar" />
          <img className='Login__Play-Icon' src={PageIcon} alt="" />
          <button className="Login__Button" onClick={handleSignIn}>
            <img className='Login__Button-Icon' src={GoogleIcon} alt="" />
            Login with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Login