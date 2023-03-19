import {Component} from 'react'

import './index.css'
import Context from '../../context/Context'

class CartItem extends Component {
  state = {count: ''}

  componentDidMount() {
    const {details} = this.props
    const {quantity} = details
    this.setState({count: quantity})
  }

  render() {
    const {count} = this.state
    const {details} = this.props
    const {imageUrl, id, cost, name, quantity} = details

    return (
      <Context.Consumer>
        {value => {
          const {handlePlusClick, handleMinusClick} = value

          const onPlusClick = () => {
            handlePlusClick(imageUrl, name, id, cost, count)
            this.setState({count: count + 1})
          }

          const onMinusClick = () => {
            handleMinusClick(imageUrl, name, id, cost, count)
            this.setState({count: count - 1})
          }

          return (
            <div testid="cartItem">
              <li className="list-item">
                <div className="detail-container">
                  <img src={imageUrl} alt={name} className="cart-image" />
                  <h1 className="cart-name-text">{name}</h1>
                </div>
                <div className="cart-count-container">
                  <button
                    type="button"
                    testid="decrement-quantity"
                    onClick={onMinusClick}
                    className="cart-plus"
                  >
                    -
                  </button>
                  <p className="cart-item-count" testid="item-quantity">
                    {count}
                  </p>
                  <button
                    type="button"
                    testid="increment-quantity"
                    onClick={onPlusClick}
                    className="cart-minus"
                  >
                    +
                  </button>
                </div>
                <p className="cart-cost-text">{cost * quantity}</p>
              </li>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default CartItem
