import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantItem = props => {
  const {details} = props
  const {id, imageUrl, cuisine, name, userRating} = details
  const updatedUserRating = {
    rating: userRating.rating,
    totalReviews: userRating.total_reviews,
  }
  const {rating, totalReviews} = updatedUserRating

  return (
    <Link
      to={`/restaurant/${id}`}
      className="styled-link"
      testid="restaurant-item"
    >
      <li className="restaurant-item">
        <img className="restaurant-image" src={imageUrl} alt={name} />
        <div>
          <h1 className="hotel-name-item">{name}</h1>
          <p className="cuisine-name-item">{cuisine}</p>
          <div className="ratings-container">
            <FaStar className="rating-star-item" />
            <p className="rating-text">{rating}</p>
            <h1 className="ratings-count-text">({totalReviews} ratings)</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
