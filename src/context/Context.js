import React from 'react'

const Context = React.createContext({
  cartList: [],
  handlePlusClick: () => {},
  handleMinusClick: () => {},
})

export default Context
