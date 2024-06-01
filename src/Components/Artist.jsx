import { useState } from "react";
import { useParams } from "react-router-dom";
import getArtist from "../Services/getArtist";

const Artist = () => {
    const { id: artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const token = window.localStorage.getItem("token");

    const fetchArtist = async () => {
        try {
            const data = await getArtist(token, artistId);
            setArtist(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    };

    if (!artist) {
        fetchArtist();
        return <div>Loading...</div>;
    }

    return (
        <div className="artist-details">
            <h1>{artist.name}</h1>
            {artist.images.length && <img width="40%" src={artist.images[0].url} alt={artist.name} />}
            <p>Followers: {artist.followers.total}</p>
            <p>Genres: {artist.genres.join(", ")}</p>
        </div>
    );
}

export default Artist;
