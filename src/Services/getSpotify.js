async function getSpotify(type, q) {
    const url = `https://api.spotify.com/v1/search?q=${q}&type=${type}`;
    const token = '7ad380c0b5d24019be9b86ce237e9388';
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
}

export default getSpotify();