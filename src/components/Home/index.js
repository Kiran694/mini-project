import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {MdOutlineSort} from 'react-icons/md'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Header from '../Header'
import PopularRestaurants from '../PopularRestaurants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Footer from '../Footer'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    carouselImages: [],
    isCarouselLoading: true,
  }

  componentDidMount() {
    this.getCarouselImagesList()
  }

  getCarouselImagesList = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const body = await response.json()
    const imagesArray = body.offers

    this.setState({carouselImages: imagesArray, isCarouselLoading: false})
  }

  getLoader = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="black" height={50} width={50} />
    </div>
  )

  getCarouselImages = () => {
    const {carouselImages} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
    }

    return (
      <div className="container">
        <Slider {...settings}>
          {carouselImages.map(each => (
            <li key={each.id}>
              <img
                className="carousel-image"
                src={each.image_url}
                alt="offer"
              />
            </li>
          ))}
        </Slider>
      </div>
    )
  }

  render() {
    const {isCarouselLoading} = this.state

    return (
      <div className="home-container">
        <Header />
        {isCarouselLoading ? this.getLoader() : this.getCarouselImages()}
        <div className="home-content-container">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <div className="para-and-sort-container">
            <p className="select-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <hr className="separator" />
          <PopularRestaurants />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
