import {Component} from 'react'

import Cookies from 'js-cookie'
import {MdOutlineSort} from 'react-icons/md'
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai'

import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import RestaurantItem from '../RestaurantItem'

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: true,
    offset: '',
    currentPage: 1,
    sort: 'Lowest',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const {sort} = this.state
    console.log('called')
    console.log(sort)

    const {offset} = this.state
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sort}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const body = await response.json()

    const updatedRestaurantsList = body.restaurants.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      cuisine: each.cuisine,
      userRating: each.user_rating,
      name: each.name,
    }))
    this.setState({restaurantsList: updatedRestaurantsList, isLoading: false})
  }

  getLoader = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="black" height={50} width={50} />
    </div>
  )

  getRestaurantsResult = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="restaurant-list-container">
        {restaurantsList.map(each => (
          <RestaurantItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  onSortChange = event => {
    this.setState({sort: event.target.value}, this.getRestaurantsList)
  }

  onLeftArrowClick = () => {
    const {currentPage} = this.state
    if (currentPage === 1) {
      const offset = (currentPage - 1) * 9
      this.setState({currentPage: 1, offset}, this.getRestaurantsList)
    } else {
      const offset = (currentPage - 1 - 1) * 9
      this.setState(
        {currentPage: currentPage - 1, offset},
        this.getRestaurantsList,
      )
    }
  }

  onRightArrowClick = () => {
    const {currentPage} = this.state
    if (currentPage === 20) {
      const offset = (currentPage - 1) * 9
      this.setState({currentPage: 20, offset}, this.getRestaurantsList)
    } else {
      const offset = (currentPage + 1 - 1) * 9
      this.setState(
        {currentPage: currentPage + 1, offset},
        this.getRestaurantsList,
      )
    }
  }

  render() {
    const {isLoading, currentPage, sort} = this.state

    return (
      <>
        <div className="sort-container">
          <MdOutlineSort className="sort-icon" />
          <p>Sort By</p>
          <select
            className="select-option"
            value={sort}
            onChange={this.onSortChange}
          >
            <option value="Lowest">Lowest</option>
            <option value="Highest">Highest</option>
          </select>
        </div>
        {isLoading ? this.getLoader() : this.getRestaurantsResult()}
        <div className="pagination">
          <AiOutlineLeft
            className="left-icon"
            onClick={this.onLeftArrowClick}
            testid="pagination-left-button"
          />
          <p className="pagination-text">
            <span testid="active-page-number">{currentPage}</span> of 20
          </p>
          <AiOutlineRight
            className="right-icon"
            testid="pagination-right-button"
            onClick={this.onRightArrowClick}
          />
        </div>
      </>
    )
  }
}

export default PopularRestaurants
