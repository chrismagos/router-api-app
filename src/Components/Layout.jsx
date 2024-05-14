import { Outlet, Link } from "react-router-dom";
import '../App.css'

import Weather from "./Weather";

const Layout = () => {
    return <>
    <div className="navigation-container">
    <div className="flex-container">
      <nav>
        <ul className="Navigation">
          <h1>Navigation</h1>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/spotify">Spotify</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className="body-container">
      <Outlet />
    </div>
    <div className="weather-container">
        <Weather></Weather>
    </div>
  </div>
  </>
}
export default Layout;