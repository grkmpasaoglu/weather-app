import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';


const Weather = () => {
    const { weatherData, currentWeatherData } = useContext(WeatherContext);

    if (!weatherData || !weatherData.list || !currentWeatherData) return <div>Veri bulunamadı.</div>;

    const iconcode = currentWeatherData.weather[0].icon;

    // Sadece her günün 12:00 saatindeki hava durumunu seçmek için veri listesini filtreleme
    const dailyWeatherAtNoon = weatherData.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Gün isimleri
    const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];


    return (
        <div className='flex flex-col bg-blue-50 items-center justify-center h-screen'>
            <div className='w-96 bg-gradient-to-b from-custom-dark to-custom-light rounded-2xl shadow-lg overflow-hidden'>
                <div className='flex flex-row justify-between p-6'>
                    <div>
                        <p className='text-white text-xl font-semibold'>Ankara</p>
                        <p className='text-white text-5xl font-bold'>{currentWeatherData.main.temp.toFixed(0)}°</p>
                    </div>
                    <div className='text-right'>
                        <img className='w-12 h-12 ml-auto' src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />
                        <p className='capitalize text-white mt-2'>{currentWeatherData.weather[0].description}</p>
                        <p className='text-white'>Y: {currentWeatherData.main.temp_max.toFixed(0)}° D: {currentWeatherData.main.temp_min.toFixed(0)}°</p>
                    </div>
                </div>
                <hr />
                <div className='p-4'>
                    {dailyWeatherAtNoon.map(item => {
                        const date = new Date(item.dt_txt);
                        const dayName = daysOfWeek[date.getDay()];

                        return (
                            <div key={item.dt} className="text-white grid grid-cols-4 items-center justify-between shadow-md rounded-lg p-4 my-2">
                                <p className='font-semibold '>{dayName.slice(0, 3)}</p>
                                <img
                                    className='w-10 h-10'   
                                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                                    alt="Weather icon"
                                />
                                <p className='text-xl font-bold'>{item.main.temp.toFixed(0)}°</p>
                                <p className='capitalize'>{item.weather[0].description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <footer className='fixed bottom-0 left-0 w-full bg-blue-50 text-center py-2'>
                <p className='text-gray-600'>Made by Görkem Paşaoğlu</p>
            </footer>
        </div>
    );
};

export default Weather;
