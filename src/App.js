import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import PopularHome from './Components/PopularHome'
import Header from './Components/Header'
import UpcomingMovies from './Components/UpcomingMovies'
import SearchedMovies from './Components/SearchedMovies'
import TopRatedMovies from './Components/TopRatedMovies'
import AppContext from './Context/AppContext'

import './App.css'

// write your code here
const constants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}
class App extends Component {
  state = {
    searchMovies: {},
    status: constants.initial,
    searchInput: '',
  }

  onChangeSearchInput = inputValue => {
    this.setState({searchInput: inputValue})
  }

  searchQuery = async (page = 1) => {
    const {searchInput} = this.state
    this.setState({status: constants.inProgress})
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=420ad37b4f6d8933c4ce36c51bb59790&language=en-US&query=${searchInput}&page=${page}`
      const response = await fetch(url)
      const data = await response.json()
      const updatedData = {
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: data.results.map(e => ({
          id: e.id,
          posterPath: `https://image.tmdb.org/t/p/w500${e.poster_path}`,
          voteAverage: e.vote_average,
          title: e.title,
        })),
      }
      this.setState({searchMovies: updatedData, status: constants.success})
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  render() {
    const {searchInput, status, searchMovies} = this.state
    return (
      <AppContext.Provider
        value={{
          searchInput,
          status,
          searchQuery: this.searchQuery,
          onChangeSearchInput: this.onChangeSearchInput,
          searchMovies,
        }}
      >
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={PopularHome} />
            <Route exact path="/top-rated" component={TopRatedMovies} />
            <Route exact path="/upcoming" component={UpcomingMovies} />
            <Route exact path="/search" component={SearchedMovies} />
          </Switch>
        </>
      </AppContext.Provider>
    )
  }
}

export default App
