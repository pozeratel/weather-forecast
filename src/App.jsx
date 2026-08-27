import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { CityWeather } from "./components/CItyWeather/CityWeather";
import { WeatherInfo } from "./components/WeatherInfo/WeatherInfo";
import { WeatherDiagram } from "./components/WeatherDiagram/WeatherDiagram";
import { DailyForecast } from "./components/DailyForecast/DailyForecast";
import { News } from "./components/News/News";
import Footer from "./components/Footer/Footer";
import { getCurrentWeather } from "./API/Weather APi/weatherAPI";
import styled from "styled-components";

const AppShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
`;

const defaultCities = ["Prague", "Kyiv", "Berlin"];
const savedCitiesKey = "weather-forecast:cities";
const savedFavoritesKey = "weather-forecast:favorites";

const readStoredList = (key, fallback) => {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key));
    return Array.isArray(savedValue) ? savedValue : fallback;
  } catch {
    return fallback;
  }
};

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
  const [cities, setCities] = useState(() =>
    readStoredList(savedCitiesKey, defaultCities),
  );
  const [favoriteCities, setFavoriteCities] = useState(() =>
    readStoredList(savedFavoritesKey, []),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [selectedDetailsCity, setSelectedDetailsCity] = useState(null);
  const [detailsWeather, setDetailsWeather] = useState(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadDetailsWeather = async () => {
      if (!selectedDetailsCity) {
        setDetailsWeather(null);
        return;
      }

      try {
        const weather = await getCurrentWeather(selectedDetailsCity);
        if (isCurrentRequest) {
          setDetailsWeather(weather);
        }
      } catch (error) {
        console.error("Failed to load weather details:", error);
        if (isCurrentRequest) {
          setDetailsWeather(null);
        }
      }
    };

    loadDetailsWeather();

    return () => {
      isCurrentRequest = false;
    };
  }, [selectedDetailsCity]);

  useEffect(() => {
    localStorage.setItem(savedCitiesKey, JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem(savedFavoritesKey, JSON.stringify(favoriteCities));
  }, [favoriteCities]);

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

  const handleForecastSelect = (type, city) => {
    setSelectedForecast((currentForecast) => {
      if (currentForecast?.type === type && currentForecast.city === city) {
        return null;
      }

      return { type, city };
    });
  };

  const handleDetailsSelect = (city) => {
    setSelectedDetailsCity((currentCity) =>
      currentCity === city ? null : city,
    );
  };

  const handleFavoriteToggle = (city) => {
    setFavoriteCities((currentFavorites) =>
      currentFavorites.includes(city)
        ? currentFavorites.filter((favoriteCity) => favoriteCity !== city)
        : [...currentFavorites, city],
    );
  };

  const handleCityRemove = (city) => {
    setCities((currentCities) =>
      currentCities.filter((currentCity) => currentCity !== city),
    );
    setFavoriteCities((currentFavorites) =>
      currentFavorites.filter((favoriteCity) => favoriteCity !== city),
    );

    if (selectedForecast?.city === city) {
      setSelectedForecast(null);
    }
    if (selectedDetailsCity === city) {
      setSelectedDetailsCity(null);
    }
  };

  return (
    <AppShell>
      <Header />
      <MainContent>
        <Hero
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <CityWeather
          searchTerm={searchTerm}
          cities={cities}
          selectedForecast={selectedForecast}
          onForecastSelect={handleForecastSelect}
          selectedDetailsCity={selectedDetailsCity}
          onDetailsSelect={handleDetailsSelect}
          favoriteCities={favoriteCities}
          onFavoriteToggle={handleFavoriteToggle}
          onCityRemove={handleCityRemove}
        />

        {selectedForecast?.type === "weekly" ? (
          <DailyForecast city={selectedForecast.city} />
        ) : null}

        {selectedDetailsCity ? (
          <WeatherInfo
          feelsLike={
            detailsWeather
              ? `${Math.round(detailsWeather.main.feels_like)}°C`
              : "--"
          }
          minTemp={
            detailsWeather
              ? `${Math.round(detailsWeather.main.temp_min)}°C`
              : "--"
          }
          maxTemp={
            detailsWeather
              ? `${Math.round(detailsWeather.main.temp_max)}°C`
              : "--"
          }
          humidity={detailsWeather ? `${detailsWeather.main.humidity}%` : "--"}
          pressure={detailsWeather ? `${detailsWeather.main.pressure} Pa` : "--"}
          windSpeed={detailsWeather ? `${detailsWeather.wind.speed} m/s` : "--"}
          visibility={
            detailsWeather
              ? `${(detailsWeather.visibility / 1000).toFixed(1)} km`
              : "Unlimited"
          }
          />
        ) : null}
        {selectedForecast?.type === "hourly" ? (
          <WeatherDiagram city={selectedForecast.city} />
        ) : null}
        <News city={cities[0]} />
      </MainContent>
      <Footer />
    </AppShell>
  );
}

export default App;
