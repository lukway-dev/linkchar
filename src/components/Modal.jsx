import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { AppContext } from '../context/AppContext'
import UserIcon from '../assets/icons/user-icon.svg'
import SignoutIcon from '../assets/icons/signout-icon.svg'
import '../styles/components/Modal.sass'

const Modal = ({ setShowModal, modalRef }) => {
  const { removeUserId, setUserData } = useContext(AppContext)
  const navigate = useNavigate()

  const goToProfile = () => {
    gsap.to(modalRef.current, { opacity: 0, duration: .5 })
    navigate('/profile')
    setTimeout(() => {
      setShowModal(false)
    }, 500)
  }

  const handleSignOut = () => {
    removeUserId()
    setUserData('')
    setShowModal(false)
    navigate('/')
  }

  return (
    <div className="Modal" ref={modalRef}>
      <button className="Modal__Link" onClick={goToProfile}>
        <img className='Modal__Icon' src={UserIcon} alt="Profile" />
        Profile
      </button>
      <button className="Modal__Button" onClick={handleSignOut}>
        <img className='Modal__Icon' src={SignoutIcon} alt="Sign Out" />
        Sign Out
      </button>
    </div>
  )
}

export default Modal