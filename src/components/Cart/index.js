import {Component} from 'react'
import {TiTickOutline} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import './index.css'
import Context from '../../context/Context'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

class Cart extends Component {
  state = {isOrdered: false}

  render() {
    return (
      <Context.Consumer>
        {value => {
          const cartLi = localStorage.getItem('cartData')
          const cartList = JSON.parse(cartLi)

          const onEmptyButtonClick = () => {
            const {history} = this.props
            history.push('/')
          }

          const onPlaceOrder = () => {
            this.setState({isOrdered: true})
            localStorage.setItem('cartData', JSON.stringify([]))
          }

          const getOrderedResults = () => (
            <div className="confirm-order-container">
              <TiTickOutline className="tick-icon" />
              <h1 className="payment-text">Payment Successful</h1>
              <p className="confirm-page-text">
                Thank you for ordering Your payment is successfully completed.
              </p>
              <p className="confirm-page-text">
                Your payment is successfully completed
              </p>
              <Link to="/">
                <button type="button" className="go-to-home-button">
                  Go to Home Page
                </button>
              </Link>
            </div>
          )

          const getSum = each => each.quantity * each.cost

          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.cost * eachCartItem.quantity
          })

          const getEmptyResults = () => (
            <div className="empty-orders-container">
              <img
                src="https://res.cloudinary.com/damurfwvm/image/upload/v1678800999/Rectangle_1456_augvqb.png"
                alt="empty cart"
              />
              <h1 className="empty-orders-heading">No Order Yet!</h1>
              <p className="empty-orders-text">
                Your cart is empty. Add something from the menu.
              </p>
              <Link to="/">
                <button className="empty-orders-button">Order Now</button>
              </Link>
            </div>
          )

          const getResults = () => {
            const {isOrdered} = this.state

            return (
              <>
                {isOrdered ? (
                  getOrderedResults()
                ) : (
                  <div className="orders-container">
                    <div className="orders-sub-container">
                      <div className="table-heading-container">
                        <h1 className="table-item-text">Item</h1>
                        <h1 className="table-heading-text">Quantity</h1>
                        <h1 className="table-heading-text">Price</h1>
                      </div>
                      <ul className="cart-items-list">
                        {cartList.map(each => (
                          <CartItem key={each.id} details={each} />
                        ))}
                      </ul>
                      <hr className="separator" />
                      <div className="total-container">
                        <h1 className="order-heading">Order Total:</h1>
                        <div className="place-order-container">
                          <p className="total-count-text" testid="total-price">
                            {total}
                          </p>
                          <button
                            onClick={onPlaceOrder}
                            type="button"
                            className="place-order-button"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )
          }

          return (
            <div>
              <Header />
              {cartList.length === 0 ? getEmptyResults() : getResults()}
              <Footer />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Cart
