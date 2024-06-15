import React, { useState } from 'react';
import './Weather.css';
import { FaSearch } from "react-icons/fa";

const Weather = () => {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');

    const API_KEY = "5acc1683650652bab831ecf7d57fd397";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    async function fetchData() {
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('No data found. Please enter a valid city name.');
            }
            let output = await response.json();
            setForecast(output.list);
            setError('');
        } catch (error) {
            setError('An error occurred. Please try again.');
            setForecast([]);
        }
    }

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div>
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name' />
                <button onClick={() => fetchData()}>
                    <FaSearch />
                </button>
            </div>

            {
                error && <p className='error-message'>{error}</p>
            }

            <div className='forecast'>
                {
                    forecast.length > 0 && forecast.map((data) => {
                        if (data && data.dt) {
                            return (
                                <div key={data.dt} className='card'>
                                    <div className='weather-image'>
                                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='' />
                                        <h3 className='desc'>{data.weather[0].description}</h3>
                                    </div>
                                    <div className='weather-temp'>
                                        <h2>{data.main.temp}<span>&deg;C</span></h2>
                                    </div>
                                    <div className='weather-date'>
                                        <h3>{getDayName(data.dt_txt)}</h3>
                                        <p>{data.dt_txt.split(' ')[0]}</p>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </div>
        </div>
    );
}

export default Weather;
