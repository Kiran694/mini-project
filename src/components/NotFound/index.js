import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    <img
      src="https://res.cloudinary.com/damurfwvm/image/upload/v1678800999/Rectangle_1456_augvqb.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
