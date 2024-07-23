import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY



const fetchWeatherData = async () => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=39.925533&lon=32.866287&appid=c0c343e85a244047a35d9fb6dcffc8a6&lang=tr&units=metric')
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=39.925533&lon=32.866287&appid=${API_KEY}&lang=tr&units=metric`);
        return response.data;
    } catch (error) {
        console.error("Hava durumu verilerini çekerken bir hata oluştu:", error);
        throw error;
    }
};


const fetchCurrentWeatherData = async () => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=39.925533&lon=32.866287&appid=c0c343e85a244047a35d9fb6dcffc8a6&units=metric&lang=tr')
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=39.925533&lon=32.866287&appid=${API_KEY}&units=metric&lang=tr`);
        return response.data;
    } catch (error) {
        console.error("Hava durumu verilerini çekerken bir hata oluştu:", error);
        throw error;
    }
};



// Context oluşturuyoruz
export const WeatherContext = createContext();

// Provider oluşturuyoruz
export const WeatherProvider = (props) => {
    const [weatherData, setWeatherData] = useState(null);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherData();
                setWeatherData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, []);


    useEffect(() => {
        const getCurrentWeatherData = async () => {
            try {
                const data = await fetchCurrentWeatherData();
                setCurrentWeatherData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getCurrentWeatherData();
    }, []);


    return (
        <WeatherContext.Provider value={{ weatherData, currentWeatherData, loading }}>
            {props.children}
        </WeatherContext.Provider>
    );
};
