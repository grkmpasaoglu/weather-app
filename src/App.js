import React from "react";
import { WeatherProvider } from "./context/WeatherContext";
import Weather from "./components/Weather";

function App() {
  return (
    <WeatherProvider>
      <Weather />
    </WeatherProvider>
  );
}

export default App;
