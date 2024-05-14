import getLocation from "../Services/getLocation";
import getWeather from "../Services/getWeather";
import { useState } from "react";

const Weather = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState("")
    const API_KEY = "1e5a4e9cfbdcddf37ee928b58e48802e"

    const handleClick = async () => {
        try{
            const coordinates = await getLocation();
            console.log(coordinates)
            const data = await getWeather(coordinates[0], coordinates[1], API_KEY);
            setWeatherData(data);
        } catch(error) {
            console.error("Error fetching weather data:", error)    
        }
    }

    return <>
    <h2>Weather</h2>
    <button onClick={handleClick}>Get Weather Data</button>
    {weatherData && (
        <div>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
        </div>
    )}
    </>
}
export default Weather;