import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AppContextProvider from '../context/AppContext'
import Grid from '../layout/Grid'
import Welcome from '../pages/Welcome'
import Login from '../pages/Login'
import FavGenres from '../pages/FavGenres'
import Profile from '../pages/Profile'
import Movies from '../pages/Movies'
import Details from '../pages/Details'
import Popular from '../pages/Popular'
import Genre from '../pages/Genre'
import Search from '../pages/Search'
import PageIcon from '../assets/icons/page-icon.svg'

const Router = () => (
  <AppContextProvider>
    <BrowserRouter>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href={PageIcon} type="image/x-icon" />
      </Helmet>

      <Grid>
        <Routes>
          <Route exact path="/" element={<Welcome/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/favorites_genres" element={<FavGenres/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/movies" element={<Movies/>}/>
          <Route exact path="/movie/:id" element={<Details/>}/>
          <Route exact path="/popular" element={<Popular/>}/>
          <Route exact path="/genre/:genre" element={<Genre/>}/>
          <Route exact path="/search/:keyword" element={<Search/>}/>
        </Routes>
      </Grid>
    </BrowserRouter>
  </AppContextProvider>
)

export default Router