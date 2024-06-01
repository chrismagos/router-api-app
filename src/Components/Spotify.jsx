import { useState, useEffect } from "react";
import getArtists from "../Services/getArtists";

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
                        {artist.images.length ? <img src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                    </div>
                    <div className="artist-name">
                        {artist.name}
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
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            : <button onClick={logout}>Logout</button>}

            {token ?
                <form onSubmit={handleSearch}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>
                : <></>
            }

            {renderArtists()}
        </div>
    );
}

export default Spotify;