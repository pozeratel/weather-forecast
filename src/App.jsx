import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { CityWeather } from "./components/CItyWeather/CityWeather";
import { WeatherInfo } from "./components/WeatherInfo/WeatherInfo";
import { WeatherDiagram } from "./components/WeatherDiagram/WeatherDiagram";
import { DailyForecast } from "./components/DailyForecast/DailyForecast";
import { News } from "./components/News/News";
import Footer from "./components/Footer/Footer";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
} from "./API/Weather APi/weatherAPI";
import styled from "styled-components";

const lightTheme = {
  appBackground: "#f4f5f7",
  pageBackground: "#ffffff",
  sectionBackground: "#ffffff",
  surface: "#e7ebf0",
  cardBackground: "#d9dde3",
  cardAltBackground: "#edeff3",
  text: "#171717",
  mutedText: "#5b6470",
  highlightedText: "#111111",
  border: "rgba(17, 17, 17, 0.12)",
  accent: "#f4a261",
  accentDark: "#e38b4d",
  buttonText: "#ffffff",
  headerBackground: "#ffffff",
  footerBackground: "#ffb266",
};

const darkTheme = {
  appBackground: "#0b1220",
  pageBackground: "#111827",
  sectionBackground: "#111827",
  surface: "#1f2937",
  cardBackground: "#1b2432",
  cardAltBackground: "#232d3d",
  text: "#edf2f7",
  mutedText: "#b7c1ce",
  highlightedText: "#f8fafc",
  border: "rgba(255, 255, 255, 0.08)",
  accent: "#f4a261",
  accentDark: "#e38b4d",
  buttonText: "#0b1220",
  headerBackground: "#0f172a",
  footerBackground: "#1a2333",
};

const AppShell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${({ theme }) => theme.appBackground};
  color: ${({ theme }) => theme.text};
  transition: background 0.2s ease, color 0.2s ease;
`;

const MainContent = styled.main`
  flex: 1;
  background: ${({ theme }) => theme.appBackground};
`;

const defaultCities = ["Prague", "Kyiv", "Berlin"];
const savedCitiesKey = "weather-forecast:cities";
const savedFavoritesKey = "weather-forecast:favorites";
const savedThemeKey = "weather-forecast:theme";

const readStoredList = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const savedValue = JSON.parse(window.localStorage.getItem(key));
    return Array.isArray(savedValue) ? savedValue : fallback;
  } catch {
    return fallback;
  }
};

const readStoredTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(savedThemeKey);
  return savedTheme === "dark" ? "dark" : "light";
};

const scrollToSection = (sectionId) => {
  if (!sectionId) {
    return;
  }

  requestAnimationFrame(() => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
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
  const [theme, setTheme] = useState(() => readStoredTheme());
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
  const [nearestLocationWeather, setNearestLocationWeather] = useState(null);

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
    if (!navigator.geolocation) {
      return;
    }

    let isCurrentRequest = true;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const weather = await getCurrentWeatherByCoords(
            coords.latitude,
            coords.longitude,
          );

          if (!isCurrentRequest) {
            return;
          }

          const nearestCity = weather?.name;

          if (!nearestCity) {
            return;
          }

          setNearestLocationWeather(weather);

          setCities((currentCities) => {
            const nextCities = currentCities.filter(
              (city) => city.toLowerCase() !== nearestCity.toLowerCase(),
            );

            return [nearestCity, ...nextCities];
          });

          setSelectedDetailsCity((currentCity) =>
            currentCity ? currentCity : nearestCity,
          );
        } catch (error) {
          console.error("Failed to load user location weather:", error);
        }
      },
      (error) => {
        console.warn("Geolocation access denied:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(savedCitiesKey, JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    window.localStorage.setItem(
      savedFavoritesKey,
      JSON.stringify(favoriteCities),
    );
  }, [favoriteCities]);

  useEffect(() => {
    window.localStorage.setItem(savedThemeKey, theme);
  }, [theme]);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const resolvedCities = citySearchMap[trimmedValue.toLowerCase()] || [
      trimmedValue,
    ];

    setCities((currentCities) => {
      const nextCities = [...currentCities];
      const seenCities = new Set(nextCities.map((city) => city.toLowerCase()));

      resolvedCities.forEach((city) => {
        const nextCity = city.trim();

        if (nextCity && !seenCities.has(nextCity.toLowerCase())) {
          nextCities.push(nextCity);
          seenCities.add(nextCity.toLowerCase());
        }
      });

      return nextCities;
    });

    setSearchTerm("");
  };

  useEffect(() => {
    if (!selectedForecast) {
      return;
    }

    const sectionId =
      selectedForecast.type === "hourly" ? "hourly-forecast" : "weekly-forecast";

    const tryScroll = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      setTimeout(tryScroll, 100);
    };

    tryScroll();
  }, [selectedForecast]);

  const handleForecastSelect = (type, city) => {
    setSelectedForecast((currentForecast) => {
      if (currentForecast?.type === type && currentForecast.city === city) {
        return null;
      }

      return { type, city };
    });
  };

  const handleDetailsSelect = (city) => {
    setSelectedDetailsCity((currentCity) => {
      const nextCity = currentCity === city ? null : city;

      if (nextCity) {
        scrollToSection("weather-details");
      }

      return nextCity;
    });
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

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <AppShell>
        <Header
          themeName={theme}
          onToggleTheme={() =>
            setTheme((currentThemeName) =>
              currentThemeName === "dark" ? "light" : "dark",
            )
          }
        />
        <MainContent>
          <Hero
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            locationWeather={nearestLocationWeather}
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
              humidity={
                detailsWeather ? `${detailsWeather.main.humidity}%` : "--"
              }
              pressure={
                detailsWeather ? `${detailsWeather.main.pressure} Pa` : "--"
              }
              windSpeed={
                detailsWeather ? `${detailsWeather.wind.speed} m/s` : "--"
              }
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
    </ThemeProvider>
  );
}

export default App;
