import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

class ItemDetails extends Component {
  state = {isLoading: true, details: []}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(params)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    this.setState({isLoading: false, details: data})
  }

  getLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="black" height={50} width={50} />
    </div>
  )

  getResults = () => {
    const {details} = this.state
    const updatedDetails = {
      costForTwo: details.cost_for_two,
      cuisine: details.cuisine,
      foodItems: details.food_items,
      id: details.id,
      imageUrl: details.image_url,
      location: details.location,
      name: details.name,
      reviewsCount: details.reviews_count,
    }
    const {
      costForTwo,
      cuisine,
      foodItems,
      id,
      imageUrl,
      location,
      name,
      reviewsCount,
    } = updatedDetails

    return (
      <div className="restaurant-details-container">
        <div className="restaurant-individual-details">
          <img
            className="details-route-main-image"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="details-texts">
            <h1 className="details-name-text">{name}</h1>
            <p className="details-cuisine-text">{cuisine}</p>
            <p className="details-location-text">{location}</p>
          </div>
        </div>
        <div className="food-items-wrap-container">
          <ul className="food-items-list">
            {foodItems.map(each => (
              <FoodItem key={id} foodDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        <Header />
        {isLoading ? this.getLoader() : this.getResults()}
        <Footer />
      </div>
    )
  }
}

export default ItemDetails
