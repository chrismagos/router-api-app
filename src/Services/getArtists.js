const getArtists = async (token, searchKey) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchKey}&type=artist&limit=30`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.artists.items;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getArtists;