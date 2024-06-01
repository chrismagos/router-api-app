const getSongs = async (token, albumId) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }

        const data = await response.json();
        return data.items; // Assuming the tracks are stored in the 'items' array
    } catch (error) {
        console.error('Error fetching songs data:', error);
    }
};

export default getSongs;