import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from '../assets/images/logo.svg'
import '../styles/pages/Welcome.sass'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const { userId } = useContext(AppContext)
  const imgRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    gsap.from(imgRef.current, { opacity: 0, scale: 0, duration: 2 })
    gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 2 })

    setTimeout(() => {
      if(userId) {
        navigate('/movies')
      } else {
        navigate('/login')
      }
    }, [2250])
  })

  return (
    <div className="Welcome">
      <h1 className="Welcome__Title">
        Welcome to
      </h1>
      <div className="Welcome__Image-Container">
        <img className="Welcome__Image" src={Logo} alt="Linkchar" ref={imgRef}/>
      </div>
    </div>
  )
}

export default Welcome


