// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const WeatherContext = createContext();

// export const WeatherProvider = ({ children }) => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [cityId] = useState('323786'); // Default city ID (Ankara)

//     useEffect(() => {
//         const fetchWeatherData = async () => {
//             try {
//                 const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
//                     params: {
//                         id: cityId, // Use the default city ID
//                         appid: 'c0c343e85a244047a35d9fb6dcffc8a6', // Replace with your OpenWeatherMap API key
//                         units: 'metric'
//                     }
//                 });
//                 setWeatherData(response.data.list);
//             } catch (error) {
//                 console.error('Error fetching the weather data:', error);
//             }
//         };

//         fetchWeatherData();
//     }, [cityId]); // Fetch new data when cityId changes

//     return (
//         <WeatherContext.Provider value={{ weatherData }}>
//             {children}
//         </WeatherContext.Provider>
//     )
// }

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const fetchWeatherData = async () => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=39.925533&lon=32.866287&appid=c0c343e85a244047a35d9fb6dcffc8a6&lang=tr&units=metric')
        return response.data;
    } catch (error) {
        console.error("Hava durumu verilerini çekerken bir hata oluştu:", error);
        throw error;
    }
};


const fetchCurrentWeatherData = async () => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=39.925533&lon=32.866287&appid=c0c343e85a244047a35d9fb6dcffc8a6&units=metric&lang=tr')
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
