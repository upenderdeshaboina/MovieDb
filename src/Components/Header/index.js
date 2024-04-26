import {Link, withRouter} from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import './index.css'

const Header = props => {
  const renderingSearchInput = () => (
    <AppContext.Consumer>
      {value => {
        const {searchQuery, onChangeSearchInput, searchInput} = value
        const onChangeInputValue = event =>
          onChangeSearchInput(event.target.value)

        const onClickSearch = () => {
          const {history} = props
          searchQuery()
          history.push('/search')
        }

        return (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              onChange={onChangeInputValue}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-btn"
              type="button"
              onClick={onClickSearch}
            >
              Search
            </button>
          </div>
        )
      }}
    </AppContext.Consumer>
  )

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <h1 className="logo">movieDB</h1>
      </div>
      {renderingSearchInput()}
      <div className="links-container">
        <ul className="list-links-container">
          <li className="link-li">
            <Link to="/" className="link">
              Popular
            </Link>
          </li>
          <li className="link-li">
            <Link to="/top-rated" className="link">
              Top Rated
            </Link>
          </li>
          <li className="link-li">
            <Link to="/upcoming" className="link">
              Upcoming
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
