import { useState, useEffect } from "react";
import getArtists from "../Services/getArtists";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Spotify() {
    const CLIENT_ID = '7ad380c0b5d24019be9b86ce237e9388';
    const REDIRECT_URI = 'http://localhost:3000/spotify';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([]);

    const [token, setToken] = useState(() => {
        const hash = window.location.hash;
        let savedToken = window.localStorage.getItem("token");
        if (!savedToken && hash) {
            savedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.localStorage.setItem("token", savedToken);
            window.location.hash = "";
        }
        return savedToken || "";
    });

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };  

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem("token");
        const artists = await getArtists(token, searchKey)
        setArtists(artists);
    }

    const renderArtists = () => {
        return (
            <div className="artists-container">
                {artists.map(artist => (
                    <div key={artist.id} className="artist">
                        <div className="artist-image">
                            {artist.images.length ? <img width="90%" src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                        </div>
                        <div className="artist-name">
                            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="spotify-container">
            <h2>Spotify</h2>
            {!token ?
                <button type="button" className="btn btn-outline-dark" onClick={() => window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</button>
            : <button type="button" onClick={logout} class="btn btn-outline-dark">Logout</button>}

            {token ?
                <form onSubmit={handleSearch} className="form-inline">
                    <div className="form-group mx-sm-3 mb-2 d-flex">
                        <input className="form-control" onChange={e => setSearchKey(e.target.value)}/>
                        <button type="submit" className="btn btn-outline-dark">Search</button>
                    </div>
                </form>
                : <></>
            }
            {renderArtists()}
        </div>
    );
}

export default Spotify;