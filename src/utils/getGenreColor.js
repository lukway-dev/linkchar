const colors = {
  Action: 'Lilac',
  Adventure: 'Orange',
  Animation: 'Cyan',
  Comedy: 'Lilac',
  Crime: 'Orange',
  Documentary: 'Cyan',
  Drama: 'Lilac',
  Family: 'Orange',
  Fantasy: 'Cyan',
  History: 'Lilac',
  Horror:'Orange',
  Music: 'Cyan',
  Mystery:'Lilac',
  Romance: 'Orange',
  'Science Fiction': 'Cyan',
  'TV Movie': 'Lilac',
  Thriller: 'Orange',
  War: 'Cyan',
  Western: 'Lilac'
}

const getGenreColor = (genre) => {
  return colors[genre]
}

export default getGenreColor