import { createContext, useState, useEffect } from 'react'
import { getUserData } from '../database/firebase'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [ userId, setUserId ] = useState('')
  const [ userData, setUserData ] = useState('')

  useEffect(() => {
    const getSavedData = async () => {
      if(!userId) {
        const savedUserId = localStorage.getItem('userId')
        savedUserId && setUserId(savedUserId)
      }

      if(userId && !userData) {
        setTimeout(async () => {
          try {
            const savedUserData = await getUserData(userId)
            savedUserData && setUserData(savedUserData)
          } catch (error) {
            console.log(error)
          }
        }, [5000])
      }
    }

    getSavedData()
  }, [userId])

  // if(userId && !userData) getSavedData()

  const saveUserId = (id) => {
    setUserId(id)
    localStorage.setItem('userId', id)
  }

  const removeUserId = () => {
    setUserId('')
    localStorage.removeItem('userId')
  }

  const values = {
    userId,
    saveUserId,
    removeUserId,
    userData,
    setUserData
  }

  return (
    <AppContext.Provider value={values}>
      { children }
    </AppContext.Provider>
  )
}

export default AppContextProvider