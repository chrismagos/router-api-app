const getAlbum = async (token, albumId) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching album data:', error);
    }
};

export default getAlbum;