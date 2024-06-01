import { useState } from "react";
import { useParams } from "react-router-dom";
import getArtist from "../Services/getArtist";
import getAlbums from "../Services/getAlbums";

const Artist = () => {
    const { id: artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const token = window.localStorage.getItem("token");
    const [albums, setAlbums] = useState(null)

    const fetchArtist = async () => {
        try {
            const data = await getArtist(token, artistId);
            setArtist(data);
            console.log(data)
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
        return <div>Loading...</div>;
    }

    const albumsOfType = (type) => {
        return albums.filter(album => album.album_type === type);
    };

    return (
        <div className="artist-details">
            <h1>{artist.name}</h1>
            {artist.images.length && <img width="40%" src={artist.images[0].url} alt={artist.name} />}
            <p>Followers: {artist.followers.total}</p>
            <p>Genres: {artist.genres.join(", ")}</p>
            <h2>Releases</h2>
            <div>
                <h3>Albums</h3>
                    <ul>
                        {albumsOfType("album").map(album => (
                            <li key={album.id}>{album.name}</li>
                        ))}
                    </ul>
            </div>
            <div>
                <h3>Singles</h3>
                <ul>
                    {albumsOfType("single").map(single => (
                        <li key={single.id}>{single.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>EPs</h3>
                <ul>
                    {albumsOfType("album").map(ep => (
                        <li key={ep.id}>{ep.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Artist;
