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

    const handleRefresh = async () => {
        try{
            const coordinates = await getLocation();
            console.log(coordinates)
            const data = await getWeather(coordinates[0], coordinates[1], API_KEY);
            setWeatherData(data);
            setImage(getWeatherIcon(data.weather[0].icon))
            console.log(data)
        } catch(error) {
            console.error("Error fetching weather data:", error)    
        }
    }

    return <>
    <h2>Weather</h2>
    <Button variant="dark" onClick={handleRefresh}>Refresh</Button>{' '}
    {weatherData && (
        <div>
            <div>
            <img src={image} alt="" />
            {(weatherData.main.temp - 273.15).toFixed(2)}°C
            </div>
            <p>Feels like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
            <p>Wind speed: {weatherData.wind.speed}m/s</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Pressure: {weatherData.main.pressure}hPa</p>
            <p>Visibility: {(weatherData.visibility/1000).toFixed(2)}km</p>
        </div>
    )}
    </>
}
export default Weather;