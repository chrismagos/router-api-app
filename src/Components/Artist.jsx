import { useState } from "react";
import { useParams } from "react-router-dom";
import getArtist from "../Services/getArtist";
import getAlbums from "../Services/getAlbums";
import { Link } from "react-router-dom";

const Artist = () => {
    const { id: artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const token = window.localStorage.getItem("token");
    const [albums, setAlbums] = useState(null)

    const fetchArtist = async () => {
        try {
            const data = await getArtist(token, artistId);
            setArtist(data);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    };

    const fetchAlbums = async () => {
        try {
            const data = await getAlbums(token, artistId);
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums data:', error);
        }
    }

    if (!artist) {
        fetchArtist();
        return <div>Loading...</div>;
    }

    if(artist && !albums){
        fetchAlbums();
        return <div>Loading albums...</div>;
    }

    const albumType = (type) => {
        return albums.filter(album => album.album_type === type);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="artist-details">
            <a href={artist.external_urls.spotify}><h1>{artist.name}</h1></a>
            {<img width="40%" src={artist.images[0].url} alt={artist.name} />}
            <p>Followers: {artist.followers.total}</p>
            <p>Genres: {artist.genres.join(", ")}</p>
            <h2>Releases:</h2>
            <div>
                <h3>Albums:</h3>
                <ul>
                    {albumType("album").map(album => (
                        <li key={album.id}>
                            <Link to={`/album/${album.id}`}>
                                {album.name} ({formatDate(album.release_date)})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Singles/EPs:</h3>
                <ul>
                    {albumType("single").map(single => (
                        <li key={single.id}>
                            <Link to={`/album/${single.id}`}>
                                {single.name} ({formatDate(single.release_date)})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Artist;
