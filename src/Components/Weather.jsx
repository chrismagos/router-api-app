import getLocation from "../Services/getLocation";
import getWeather from "../Services/getWeather";
import { useState } from "react";
import getWeatherIcon from "../Services/getWeatherIcon";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Weather = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null)
    const [image, setImage] = useState("")

    const API_KEY = "1e5a4e9cfbdcddf37ee928b58e48802e"

    const handleClick = async () => {
        try{
            const coordinates = await getLocation();
            console.log(coordinates)
            const data = await getWeather(coordinates[0], coordinates[1], API_KEY);
            setWeatherData(data);
            setImage(getWeatherIcon(data.weather[0].icon))
        } catch(error) {
            console.error("Error fetching weather data:", error)    
        }
    }

    return <>
    <h2>Weather</h2>
    <button type="button" variant="dark" onClick={handleClick}>Refresh</button>{' '}
    {weatherData && (
        <div>
            <img src={image} alt="" />
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
        </div>
    )}
    </>
}
export default Weather;