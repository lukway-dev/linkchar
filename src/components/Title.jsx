import '../styles/components/Title.sass'

const Title = ({ children }) => {
  return (
    <h2 className='Title'>
      { children }
    </h2>
  )
}

export default Title