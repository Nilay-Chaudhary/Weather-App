import React, { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'
import SearchBar from './components/SearchBar'
import TimeAndLocation from './components/TimeAndLocation'
import TempAndDets from './components/TempAndDets'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'
import Loading from './components/Loading'

const App = () => {
  const [query, setQuery] = useState({q:"ahmedabad"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    await getFormattedWeatherData({...query, units})
          .then((data) => {
            console.log(data);
            setWeather(data);
          });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if(!weather) return 'from-cyan-600 to-blue-700'
    const hot = units === "metric" ? 30 : 85
    if(weather.temp < hot) return 'from-cyan-600 to-blue-700'
    else return 'from-yellow-600 to-orange-600'
  }

  return (
    <div className={`text-white mx-auto max-w-screen-lg my-3 py-2 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <SearchBar setQuery={setQuery} setUnits={setUnits}/>
      {weather ? (
        <>
          <TimeAndLocation weather={weather}/>
          <TempAndDets units={units} weather={weather}/>
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="Daily forecast" data = {weather.daily}/>
          <br/>
        </>
      ) :
      (
      <Loading />
    )}
    </div>
  )
}

export default App