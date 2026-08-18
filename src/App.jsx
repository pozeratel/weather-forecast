import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { CityWeather } from "./components/CItyWeather/CityWeather";
import { WeatherInfo } from "./components/WeatherInfo/WeatherInfo";
import { WeatherDiagram } from "./components/WeatherDiagram/WeatherDiagram";
import { getCurrentWeather } from "./API/Weather APi/weatherAPI";
import "./App.css";

const defaultCities = ["Prague", "Kyiv", "Berlin"];

const citySearchMap = {
  prague: ["Prague"],
  kyiv: ["Kyiv"],
  berlin: ["Berlin"],
  paris: ["Paris"],
  warsaw: ["Warsaw"],
  london: ["London"],
  amsterdam: ["Amsterdam"],
  vienna: ["Vienna"],
  budapest: ["Budapest"],
  bucharest: ["Bucharest"],
  sofia: ["Sofia"],
  athens: ["Athens"],
  rome: ["Rome"],
  madrid: ["Madrid"],
  barcelona: ["Barcelona"],
  lisbon: ["Lisbon"],
  dublin: ["Dublin"],
  brussels: ["Brussels"],
  zurich: ["Zurich"],
  milan: ["Milan"],
  stockholm: ["Stockholm"],
  oslo: ["Oslo"],
  copenhagen: ["Copenhagen"],
  helsinki: ["Helsinki"],
  krakow: ["Krakow"],
  gdansk: ["Gdansk"],
  wroclaw: ["Wroclaw"],
  lviv: ["Lviv"],
  kharkiv: ["Kharkiv"],
  odesa: ["Odesa"],
  minsk: ["Minsk"],
  tallinn: ["Tallinn"],
  riga: ["Riga"],
  vilnius: ["Vilnius"],
  "czech republic": ["Prague"],
  ukraine: ["Kyiv"],
  germany: ["Berlin"],
  france: ["Paris"],
  poland: ["Warsaw"],
  "united kingdom": ["London"],
};

function App() {
  const [cities, setCities] = useState(defaultCities);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const loadCurrentCityWeather = async () => {
      if (!cities.length) {
        setCurrentWeather(null);
        return;
      }

      try {
        const weather = await getCurrentWeather(cities[0]);
        setCurrentWeather(weather);
      } catch (error) {
        console.error("Failed to load current city weather:", error);
        setCurrentWeather(null);
      }
    };

    loadCurrentCityWeather();
  }, [cities]);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const normalizedValue = trimmedValue.toLowerCase();
    const resolvedCities = citySearchMap[normalizedValue] || [trimmedValue];

    setCities((currentCities) => {
      const nextCities = [...currentCities];

      resolvedCities.forEach((city) => {
        const nextCity = city.trim();
        const cityExists = nextCities.some(
          (item) => item.toLowerCase() === nextCity.toLowerCase(),
        );

        if (nextCity && !cityExists) {
          nextCities.push(nextCity);
        }
      });

      return nextCities;
    });

    setSearchTerm("");
  };

  return (
    <>
      <Header />
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <CityWeather searchTerm={searchTerm} cities={cities} />

      <WeatherInfo
        feelsLike={
          currentWeather
            ? `${Math.round(currentWeather.main.feels_like)}°C`
            : "--"
        }
        minTemp={
          currentWeather
            ? `${Math.round(currentWeather.main.temp_min)}°C`
            : "--"
        }
        maxTemp={
          currentWeather
            ? `${Math.round(currentWeather.main.temp_max)}°C`
            : "--"
        }
        humidity={currentWeather ? `${currentWeather.main.humidity}%` : "--"}
        pressure={currentWeather ? `${currentWeather.main.pressure} Pa` : "--"}
        windSpeed={currentWeather ? `${currentWeather.wind.speed} m/s` : "--"}
        visibility={
          currentWeather
            ? `${(currentWeather.visibility / 1000).toFixed(1)} km`
            : "Unlimited"
        }
      />
      <WeatherDiagram city={cities[0]} />
    </>
  );
}

export default App;
