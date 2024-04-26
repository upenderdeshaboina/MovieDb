import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {details} = props
  const {id, title, posterPath, voteAverage} = details
  return (
    <li className="card-container">
      <img src={posterPath} className="image" alt={title} />
      <div className="rating-container">
        <h1 className="title">{title}</h1>
        <p className="rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="link">
        <button className="view-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
