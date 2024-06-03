import { Outlet, Link } from "react-router-dom";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Weather from "./Weather";

const Layout = () => {
    return <>
    <div className="navigation-container">
    <div className="flex-container">
      <nav>
          <div className="row">
          <h2>Navigation</h2>
            <div className="col-12 mb-2">
                <Link to="/" className="btn btn-outline-dark w-100">Home</Link>
            </div>
            <div className="col-12 mb-2">
                <Link to="/spotify" className="btn btn-outline-dark w-100">Spotify</Link>
            </div>
          </div>
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