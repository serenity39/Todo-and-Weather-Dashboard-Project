import { useState } from 'react';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function WeatherWidget() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSearch(e) {
        e.preventDefault();
        
        if (city.trim() === '') {
            setError('Please enter a city name.');
            return;
        }

        setIsLoading(true);
        setError('');
        setWeather(null);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            setWeather(data);
        }
        catch (err) {
            setError(err.message || 'An error occurred while fetching the weather data.');
        }
        finally {
            setIsLoading(false);
        }
    }

    function getLocalTime(timezone) {
        const utcDate = new Date(Date.now() + timezone * 1000);
        return utcDate.toLocaleString('en-GB', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }


    return (
        <div className="weather-widget">
            <h2>Weather Widget</h2>
            <form className="weather-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-block">
                    <h3>
                        📍{weather.name}, {weather.sys.country}
                        <div className="local-time">🕒: {getLocalTime(weather.timezone)}</div>
                    </h3>
                    <div className="weather-inline">
                        <div className="inline-item">
                            <img src="/thermometer-half.svg" alt="Temperature" className="inline-icon" />
                            {Math.round(weather.main.temp)} °C
                        </div>
                        <div className="inline-item">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                                className="inline-icon"
                            />
                            {weather.weather[0].description.replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div className="inline-item">
                            <img src="/wind.svg" alt="Wind" className="inline-icon" />
                            {Math.round(weather.wind.speed)} m/s
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
