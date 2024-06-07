import { DateTime } from "luxon";

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(base_url + infoType);
    url.search = new URLSearchParams({...searchParams, appid : api_key});

    return fetch(url)
    .then((res) => res.json());
}

const iconURL = (icon) => { 
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

const formatToLocalTime = (seconds, offset, format) => {
    const result = DateTime.fromSeconds(seconds+offset, {zone:"utc"}).toFormat(format);
    return result;
}

const formatCurrent = (data) => {
    // console.log(data);
    const {
        coord : {lat, lon},
        main : {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys : {country, sunrise, sunset},
        weather,
        wind : {speed},
        timezone
    } = data;
    const {main : details, icon} = weather[0];

    const formattedLocalTime = formatToLocalTime(dt, timezone, "cccc, dd LLL yyyy' | Local time: 'hh:mm a");
    const formattedSunriseTime = formatToLocalTime(sunrise, timezone, 'hh:mm a');
    const formattedSunsetTime = formatToLocalTime(sunset, timezone, 'hh:mm a');

    return {temp, feels_like, temp_min, temp_max, humidity, name, country, 
        formattedSunriseTime, formattedSunsetTime, dt, timezone, lat, lon, 
        speed, details, icon:iconURL(icon), formattedLocalTime
    };
} 

const formatForecastWeather = (seconds, offset, data) => {
    // filter data based on whether time of data is after seconds
    // interval of fetched data is 3 hr so we get data of next 5 multiples of 3
    const hourly = data
                    .filter((f) => f.dt > seconds)
                    .slice(0, 5)
                    .map((f) => ({
                        temp : f.main.temp,
                        title : formatToLocalTime(f.dt, offset, 'hh:mm a'),
                        icon : iconURL(f.weather[0].icon),
                        date : f.dt_txt
                    }));

    // filter data based on whether it is after current day by using 00:00:00 ie 12AM
    const daily = data
                    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
                    .map((f) => ({
                        temp : f.main.temp,
                        title : formatToLocalTime(f.dt, offset, 'ccc'),
                        icon : iconURL(f.weather[0].icon),
                        date : f.dt_txt
                    }));

    return {hourly, daily};
}

const getFormattedWeatherData = async(searchParams) => {
    const formattedWeather = await getWeatherData('weather', searchParams)
    .then((data) => formatCurrent(data));

    const {dt, lat ,lon, timezone} = formattedWeather
    const formattedForecastWeather = await getWeatherData('forecast', {lat, lon, units:searchParams.units})
    .then((data) => formatForecastWeather(dt, timezone, data.list))

    return {...formattedWeather, ...formattedForecastWeather};
}

export default getFormattedWeatherData