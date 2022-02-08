import { useState, useEffect, Suspense, lazy } from 'react'
import { getNewsMovies } from '../api/api'
import Title from '../components/Title'
import Loading from '../components/Loading'
import TopArrow from '../assets/icons/sort-category-arrow-top.svg'
import BottomArrow from '../assets/icons/sort-category-arrow-bottom.svg'
import '../styles/containers/News.sass'

const Movie = lazy(() => import('../components/Movie'))

const News = () => {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getNewsMovies()
      setItems(data)
    }

    if(items.length === 0) {
      getData()
    }
  }, [items])

  return (
    <div className="News">
      <div className="News__Title">
        <Title>New movies</Title>
        <div className="News__Sort-Container">
          <span className="News__Sort-Text">Sort By</span>
          <button className="News__Sort-Button">
            Today
            <img src={TopArrow} alt="" />
            <img src={BottomArrow} alt="" />
          </button>
        </div>
      </div>
      <div className='News__Movies-Container'>
        {items.map(item =>
          <Suspense key={`Movie-${item.id}`} fallback={<Loading/>}>
            <Movie {...item}/>
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default News