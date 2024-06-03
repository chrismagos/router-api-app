const getArtist = async (token, artistId) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        return(data);
    } catch (error) {
        console.error('Error fetching artist data:', error);
    }
};
export default getArtist;