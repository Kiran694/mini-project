import {Component} from 'react'
import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="heading-container">
        <img
          className="footer-logo"
          src="https://res.cloudinary.com/damurfwvm/image/upload/v1678865326/Vector_x6c36k.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchen</h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-icons-container">
        <FaPinterestSquare
          className="footer-icons"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="footer-icons" testid="instagram-social-icon" />
        <FaTwitter className="footer-icons" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="footer-icons"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
