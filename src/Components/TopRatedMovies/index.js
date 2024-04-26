import {Component} from 'react'

import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

class TopRatedMovies extends Component {
  state = {isLoader: true, moviesResponse: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=420ad37b4f6d8933c4ce36c51bb59790&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedObj = {
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: data.results.map(e => ({
        id: e.id,
        posterPath: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
        voteAverage: e.vote_average,
        title: e.title,
      })),
    }
    this.setState({isLoader: false, moviesResponse: updatedObj})
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#000" />
    </div>
  )

  renderMoviesList = () => {
    const {moviesResponse} = this.state
    const {results} = moviesResponse
    return (
      <ul className="movies-list-container">
        {results.map(e => (
          <MovieCard key={e.id} details={e} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoader, moviesResponse} = this.state
    return (
      <>
        <div className="main-container">
          {isLoader ? this.renderLoaderView() : this.renderMoviesList()}
        </div>
        <Pagination
          totalPages={moviesResponse.totalPages}
          getData={this.getData}
        />
      </>
    )
  }
}
export default TopRatedMovies
