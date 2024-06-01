const getAlbums = async (token, artistId) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching album data:', error);
    }
};

export default getAlbums;