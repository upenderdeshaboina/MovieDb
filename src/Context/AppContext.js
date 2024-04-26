import {createContext} from 'react'

const AppContext = createContext({
  searchMovies: {},
  searchQuery: () => {},
})
export default AppContext
