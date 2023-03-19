import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'
import {GiHamburgerMenu} from 'react-icons/gi'

const Header = props => {
  const onLogoutClick = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    localStorage.setItem('cartData', JSON.stringify([]))
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-left-side-items">
        <Link to="/">
          <img
            className="header-logo"
            src="https://res.cloudinary.com/damurfwvm/image/upload/v1678865326/Vector_x6c36k.png"
            alt="website logo"
          />
        </Link>

        <h1 className="header-heading">Tasty Kitchen</h1>
      </div>
      <GiHamburgerMenu className="hamburger" />
      <div className="header-items-container">
        <ul className="header-list">
          <Link to="/">
            <li className="header-list-item">Home</li>
          </Link>

          <Link to="/cart">
            <li className="header-list-item">Cart</li>
          </Link>
        </ul>
        <button onClick={onLogoutClick} className="logout-button" type="button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
