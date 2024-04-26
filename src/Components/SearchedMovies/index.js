import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import AppContext from '../../Context/AppContext'
import './index.css'

const constants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

const SearchedMovies = () => {
  const renderNoVideosView = () => (
    <div className="no-videos-container">
      <h1>No results found.</h1>
      <p>Do not get worried, Try to search again.</p>
    </div>
  )

  const renderMovies = searchMovies => {
    const {results} = searchMovies
    if (!results.length) {
      return renderNoVideosView()
    }
    return (
      <ul className="movies-list">
        {results.map(e => (
          <MovieCard key={e.id} details={e} />
        ))}
      </ul>
    )
  }

  const renderLoading = () => (
    <div className="loading-container">
      <Loader color="#000" type="TailSpin" />
    </div>
  )

  const renderAllView = value => {
    const {searchMovies, status} = value
    switch (status) {
      case constants.inProgress:
        return renderLoading()
      case constants.success:
        return renderMovies(searchMovies)
      default:
        return renderNoVideosView()
    }
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {searchMovies, searchQuery} = value
        return (
          <>
            <div className="search-container">{renderAllView(value)}</div>
            <Pagination
              totalPages={searchMovies.totalPages}
              getData={searchQuery}
            />
          </>
        )
      }}
    </AppContext.Consumer>
  )
}
export default SearchedMovies
