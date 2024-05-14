function getLocation() {
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const location = [latitude, longitude];
                    resolve(location);
                },
                error => {
                    reject(error)
                }
            );
        }
       else {
        reject(new Error("Geolocation is not supported by this browser."));
       }
    });
}

export default getLocation;