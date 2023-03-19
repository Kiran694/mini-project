import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import ItemDetails from './components/ItemDetails'
import Context from './context/Context'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {cartList: []}

  componentDidMount() {
    const cartData = localStorage.getItem('cartData')
    const parseCartData = JSON.parse(cartData)

    this.setState({cartData: parseCartData})
  }

  handlePlusClick = (imageUrl, name, id, cost, count) => {
    const {cartList} = this.state
    const details = {
      imageUrl,
      name,
      id,
      cost,
      quantity: count + 1,
    }

    console.log(details.quantity)

    const filteredId = cartList.filter(each => each.id === id)
    console.log(filteredId)

    if (filteredId.length === 0) {
      this.setState({cartList: [...cartList, details]})
      localStorage.setItem('cartData', JSON.stringify([...cartList, details]))
    } else {
      const leng = filteredId.length
      if (leng === 1) {
        const updatedDetails = filteredId.map(each => ({
          ...each,
          quantity: each.quantity + 1,
        }))

        const updatedCartList = cartList.map(each => {
          if (each.id === updatedDetails[0].id) {
            return updatedDetails[0]
          }

          return each
        })
        this.setState({cartList: updatedCartList})
        localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      }
    }
  }

  handleMinusClick = (imageUrl, name, id, cost, count) => {
    const {cartList} = this.state

    const filteredId = cartList.filter(each => each.id === id)

    console.log(filteredId)

    if (filteredId.length === 1) {
      const updatedDetails = filteredId.map(each => ({
        ...each,
        quantity: each.quantity - 1,
      }))

      const updatedCartList = cartList.map(each => {
        if (each.id === updatedDetails[0].id) {
          return updatedDetails[0]
        }

        return each
      })

      const filteredUpdatedCartList = updatedCartList.filter(
        each => each.quantity !== 0,
      )

      this.setState({cartList: filteredUpdatedCartList})
      localStorage.setItem('cartData', JSON.stringify(filteredUpdatedCartList))
    }
  }

  render() {
    const {cartList} = this.state
    console.log('hello')
    console.log(cartList)
    console.log('hello')
    return (
      <Context.Provider
        value={{
          cartList,
          handlePlusClick: this.handlePlusClick,
          handleMinusClick: this.handleMinusClick,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={ItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/NotFound" component={NotFound} />
          <Redirect to="/NotFound" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
