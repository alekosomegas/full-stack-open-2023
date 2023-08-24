import axios from "axios";
import { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const Country = ({ country }) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
          )
          .then((res) => {
            console.log(res.data.weather);
            setWeather({
                temp: res.data.main.temp,
                wind: res.data.wind.speed,
                icon: "https://openweathermap.org/img/wn/" + res.data.weather[0]?.icon + "@2x.png",

            })
        })
        .catch(e => console.log(e));

    }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt}></img>

      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.temp} Celcius</p>
        <img src={weather.icon}></img>
        <p>wind {weather.wind} m/s</p>
      </div>
    </div>
  );
};

export default Country;
