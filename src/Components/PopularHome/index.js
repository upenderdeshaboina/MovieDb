import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Pagination from '../Pagination'
import MovieCard from '../MovieCard'
import './index.css'

class PopularHome extends Component {
  state = {isLoading: true, moviesObj: {}}

  componentDidMount() {
    this.getData()
  }

  getData = async (page = 1) => {
    const API_KEY = '420ad37b4f6d8933c4ce36c51bb59790'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = {
      totalPages: data.total_pages,
      totalResults: data.totoal_results,
      results: data.results.map(e => ({
        id: e.id,
        posterPath: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
        voteAverage: e.vote_average,
        title: e.title,
      })),
    }
    this.setState({isLoading: false, moviesObj: updatedData})
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#000" />
    </div>
  )

  renderMoviesListView = () => {
    const {moviesObj} = this.state
    const {results} = moviesObj
    return (
      <ul className="movies-list">
        {results.map(e => (
          <MovieCard key={e.id} details={e} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, moviesObj} = this.state
    return (
      <>
        <div className="popular-main-container">
          {isLoading ? this.renderLoadingView() : this.renderMoviesListView()}
        </div>
        <Pagination totalPages={moviesObj.totalPages} getData={this.getData} />
      </>
    )
  }
}
export default PopularHome
