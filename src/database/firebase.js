import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase, ref, set, update, get, child } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCW4atRSoOnHfy5J48FzIGwlfVAZUflQcc',
  authDomain: 'linkchar-2022.firebaseapp.com',
  databaseURL: 'https://linkchar-2022-default-rtdb.firebaseio.com',
  projectId: 'linkchar-2022',
  storageBucket: 'linkchar-2022.appspot.com',
  messagingSenderId: '494435227520',
  appId: '1:494435227520:web:0df9e1640f27e435e49365'
}

initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase()
const provider = new GoogleAuthProvider()

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const userId = user.uid

    const userData = {
      username: user.displayName,
      email: user.email,
      image: user.photoURL,
      favGenres: await getUserFavGenres(userId)
    }

    await update(ref(database, 'users/' + userId), userData)

    return { userId, userData }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = GoogleAuthProvider.credentialFromError(error)
  }
}

export const signOut = async () => {
  try {
    signOut(auth)
  } catch (error) {
    console.log(error)
  }
}

export const getUserData = async (userId) => {
  try {
    const snapshot = await get(child(ref(database), `users/${userId}`))

    if(snapshot.exists()) {
      return snapshot.val()
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const getUserFavGenres = async (userId) => {
  const snapshot = await get(child(ref(database), `users/${userId}/favGenres`))

  if(snapshot.exists()) {
    const favGenres = snapshot.val()
    return favGenres.sort()
  }

  return []
}

export const addFavGenre = async (genre, userId) => {
  const favGenres = await getUserFavGenres(userId)

  if(!favGenres.includes(genre)) {
    favGenres.push(genre)
  }

  favGenres.sort()

  try {
    await update(ref(database, `users/${userId}`), {
      favGenres
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeFavGenre = async (genre, userId) => {
  const favGenres = await getUserFavGenres(userId)

  try {
    await update(ref(database, `users/${userId}`), {
      favGenres: favGenres.filter(item => item !== genre)
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUserFavMovies = async (userId) => {
  const snapshot = await get(child(ref(database), `users/${userId}/favMovies`))

  if(snapshot.exists()) {
    const favMovies = snapshot.val()
    return favMovies.sort()
  }

  return []
}

export const addFavMovie = async (movie, userId) => {
  const favMovies = await getUserFavMovies(userId)

  if(!favMovies.includes(movie)) {
    favMovies.push(movie)
  }

  favMovies.sort()

  try {
    await update(ref(database, `users/${userId}`), {
      favMovies
    })
  } catch (error) {
    console.log(error)
  }
}

export const removeFavMovie = async (movie, userId) => {
  const favMovies = await getUserFavMovies(userId)

  try {
    await update(ref(database, `users/${userId}`), {
      favMovies: favMovies.filter(item => item !== movie)
    })
  } catch (error) {
    console.log(error)
  }
}