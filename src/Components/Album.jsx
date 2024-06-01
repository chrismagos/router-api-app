import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getAlbum from "../Services/getAlbum";
import getSongs from "../Services/getSongs";

const Album = () => {
    const { id: albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const token = window.localStorage.getItem("token");
    const [songs, setSongs] = useState(null)

    const fetchAlbum = async () => {
        try{
           const data = await getAlbum(token, albumId)
           setAlbum(data)
        } catch(error){
            console.error('Error fetching album data:', error);
        }
    }

    const fetchSongs = async () => {
        try{
            const data = await getSongs(token, albumId)
            setSongs(data)
            console.log(data)
        }catch(error){
            console.error('Error fetching song data:', error)
        }
    }

    if (!album) {
        fetchAlbum();
        return <div>Loading...</div>;
    }

    if(album && !songs){
        fetchSongs()
        return <div>Loading songs...</div>
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h1>{album.name}</h1>
            {<img width="40%" src={album.images[0].url} alt={album.name} />}
            <p>Artist: {album.artists.map(artist => artist.name).join(", ")}</p>
            <p>Release Date: {formatDate(album.release_date)}</p>
            <p>Number of tracks: {album.total_tracks}</p>
            <ul>
            <h2>Tracks:</h2>
            {songs.map(song => (
                        <li key={song.id}>
                            {song.track_number}: {song.name}, {formatDuration(song.duration_ms)}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Album;
