import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Spotify() {
    const CLIENT_ID = '7ad380c0b5d24019be9b86ce237e9388';
    const REDIRECT_URI = 'http://localhost:3000/spotify';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.localStorage.setItem("token", token);
            window.location.hash = "";
            setToken(token);
        }
    }, [location.hash]);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };


    const searchArtists = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem("token");
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setArtists(data.artists.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>

                : <h3>Please login</h3>
            }

            {renderArtists()}
        </div>
    );
}

export default Spotify;
