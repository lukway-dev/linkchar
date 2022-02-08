import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { AppContext } from '../context/AppContext'
import Modal from './Modal'
import SearchIcon from '../assets/icons/search-icon.svg'
import UserIcon from '../assets/icons/user-icon.svg'
import BottomArrow from '../assets/icons/arrow-bottom-icon.svg'
import '../styles/components/Actions.sass'

const Actions = () => {
  const [ showModal, setShowModal ] = useState(false)
  const { userData } = useContext(AppContext)
  const inputRef = useRef(null)
  const modalRef = useRef(null)
  const navigate = useNavigate()

  const handleShowModal = () => {
    if(showModal) {
      gsap.to(modalRef.current, { opacity: 0, duration: .5 })
      setTimeout(() => {
        setShowModal(false)
      }, 500)
    } else {
      setShowModal(true)
    }
  }

  const handleSearch = () => {
    if(inputRef.current.value) {
      navigate(`/search/${inputRef.current.value}`)
    }
  }

  document.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
      handleSearch()
    }
  })

  if(userData) return (
    <div className='Actions'>
      <input
        className='Action__Input'
        type="text"
        placeholder='Movie...'
        ref={inputRef}
      />

      <button className='Action__Button' onClick={handleSearch}>
        <img
          className='Action__Button-Icon'
          src={SearchIcon}
          alt="Search"
          title='Search'
        />
      </button>

      <button className='Action__Button Action__User' onClick={handleShowModal}>
        <img
          className={userData.image ? 'Action__Profile-Image' : 'Action__Button-Icon'}
          src={userData.image ? userData.image : UserIcon}
          alt="Profile"
          title='Profile'
        />
        <img
          className='Action__Button-Arrow'
          src={BottomArrow}
          title='Profile'
        />
      </button>
      {showModal && <Modal setShowModal={setShowModal} modalRef={modalRef}/>}
    </div>
  )

  return null
}

export default Actions