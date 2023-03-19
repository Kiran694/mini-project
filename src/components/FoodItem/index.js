import {useState} from 'react'

import {FaStar} from 'react-icons/fa'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

import './index.css'
import Context from '../../context/Context'

const FoodItem = props => {
  const [isAdd, setIsAdd] = useState(false)
  const [count, setCount] = useState(0)

  const {foodDetails} = props
  const updatedDetails = {
    cost: foodDetails.cost,
    foodType: foodDetails.food_type,
    id: foodDetails.id,
    imageUrl: foodDetails.image_url,
    name: foodDetails.name,
    rating: foodDetails.rating,
  }

  const {cost, foodType, id, imageUrl, name, rating} = updatedDetails

  const handleAddClick = handlePlusClick => {
    setIsAdd(!isAdd)
  }

  let content = (
    <Context.Consumer>
      {value => {
        const {handlePlusClick} = value

        return (
          <button
            onClick={() => {
              handleAddClick(handlePlusClick)
            }}
            className="add-button"
          >
            Add
          </button>
        )
      }}
    </Context.Consumer>
  )

  if (isAdd) {
    content = (
      <Context.Consumer>
        {value => {
          const {handleMinusClick, handlePlusClick} = value

          const onPlusClick = () => {
            setCount(count + 1)
            handlePlusClick(imageUrl, name, id, cost, count)
          }

          const onMinusClick = () => {
            if (count < 2) {
              setIsAdd(false)
              setCount(0)
            } else {
              setCount(count - 1)
            }
            handleMinusClick(imageUrl, name, id, cost, count)
          }

          return (
            <div className="plus-minus-container">
              <button
                testid="decrement-count"
                onClick={onMinusClick}
                className="minus-button"
              >
                -
              </button>
              <p className="items-count-text" testid="active-count">
                {count}
              </p>
              <button
                testid="increment-count"
                onClick={onPlusClick}
                className="plus-button"
              >
                +
              </button>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
  return (
    <li className="food-item" testid="foodItem">
      <img className="food-item-image" src={imageUrl} alt={name} />
      <div className="food-details-text">
        <h1 className="food-item-name">{name}</h1>
        <p className="food-item-cost">₹ {cost}.00</p>
        <div className="food-item-rating-container">
          <FaStar className="food-item-star" />
          <p className="food-item-rating">{rating}</p>
        </div>
        {content}
      </div>
    </li>
  )
}

export default FoodItem
