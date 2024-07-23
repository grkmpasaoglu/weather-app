// import React, { useContext, useState, useEffect } from 'react';
// import { WeatherContext } from '../context/WeatherContext';

// const getDayName = (dateString) => {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const date = new Date(dateString);
//     return days[date.getDay()];
// };

// const filterByNoon = (data) => {
//     const filtered = data.filter(item => {
//         const hour = new Date(item.dt_txt).getHours();
//         return hour === 15; // 15:00'teki verileri filtrele
//     });

//     const grouped = {};
//     filtered.forEach(item => {
//         const date = new Date(item.dt_txt);
//         const dayName = getDayName(item.dt_txt);
//         const dateString = date.toDateString();

//         if (!grouped[dateString]) {
//             grouped[dateString] = { day: dayName, temp: item.main.temp, description: item.weather[0].description };
//         }
//     });

//     return Object.values(grouped);
// };

// const generateMissingDays = (data, numberOfDays) => {
//     const daysSet = new Set(data.map(item => item.day));
//     const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const result = [];
//     let currentIndex = allDays.indexOf(new Date().toLocaleString('en-US', { weekday: 'long' }));

//     for (let i = 0; i < numberOfDays; i++) {
//         const dayName = allDays[currentIndex];
//         result.push(daysSet.has(dayName) ? 
//             data.find(item => item.day === dayName) :
//             { day: dayName, temp: 'N/A', description: 'No data' }
//         );
//         currentIndex = (currentIndex + 1) % 7;
//     }

//     return result;
// };

// const Weather = () => {
//     const { weatherData } = useContext(WeatherContext);
//     const [currentTemp, setCurrentTemp] = useState(null);
//     const [currentCondition, setCurrentCondition] = useState(null);
//     const [dailyTemperatures, setDailyTemperatures] = useState([]);

//     useEffect(() => {
//         if (weatherData.length > 0) {
//             // İlk hava durumu verisini kullanarak mevcut sıcaklığı ve durumu güncelle
//             setCurrentTemp(weatherData[0].main.temp);
//             setCurrentCondition(weatherData[0].weather[0].description);

//             // Günlük sıcaklıkları al
//             const filteredWeatherData = filterByNoon(weatherData);
//             const weatherWithMissingDays = generateMissingDays(filteredWeatherData, 7);
//             setDailyTemperatures(weatherWithMissingDays);
//         }
//     }, [weatherData]);

//     return (
//         <div className='flex flex-col items-center p-4'>
//             <h1 className='text-3xl font-bold mb-4'>Hava Durumu</h1>

//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//                 {/* Sol üstte mevcut sıcaklık */}
//                 {currentTemp !== null && (
//                     <div className='flex flex-col absolute top-2 left-2 text-xl font-bold'>
//                         <p>ANKARA</p>
//                         <p>{currentTemp.toFixed(1)} °C</p>
//                         <p>{currentCondition}</p>
//                     </div>
//                 )}
//                 {dailyTemperatures.length > 0 ? (
//                     dailyTemperatures.map((item, index) => (
//                         <div key={index} className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center relative'>
//                             {/* Günün adı ve sıcaklık */}
//                             <p className='absolute top-2 left-2 text-lg font-semibold'>
//                                 {item.day}
//                             </p>
//                             <p className='text-xl font-bold mt-2'>{item.temp === 'N/A' ? 'N/A' : item.temp.toFixed(1) + ' °C'}</p>
//                             <p className='text-sm text-gray-600 mt-1 capitalize'>{item.description}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading weather data...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Weather;
import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const Weather = () => {
    const { weatherData, currentWeatherData } = useContext(WeatherContext);

    if (!weatherData || !weatherData.list || !currentWeatherData) return <div>Veri bulunamadı.</div>;

    const iconcode = currentWeatherData.weather[0].icon; // `currentWeatherData`'dan alıyoruz

    return (
        <div className='container flex items-center justify-center h-screen'>
            <div className='size-96 bg-blue-400 rounded-2xl'>
                <div className='font-medium flex flex-row justify-between p-4'>
                    <div>
                        <p className='text-white text-xl'>Ankara</p>
                        <p className='text-white text-5xl'>{currentWeatherData.main.temp.toFixed(0)}°</p>
                    </div>
                    <div className='text-right'>
                        <img className='size-10 ml-auto' src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />
                        <p className='burası capitalize text-white'>{currentWeatherData.weather[0].description}</p>
                        <p className='text-white'>Y: {currentWeatherData.main.temp_max.toFixed(0)}° D: {currentWeatherData.main.temp_min.toFixed(0)}°</p>
                    </div>
                </div>
                <hr />

                {weatherData.list.map(item => (
                    <div key={item.dt} className="bg-white shadow-md rounded-lg p-4 m-2">
                        <img
                            className='w-10 h-10'
                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            alt="Weather icon"
                        />
                        <p>{item.main.temp.toFixed(0)}°</p>
                        <p className='text-blue-400 capitalize'>{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
