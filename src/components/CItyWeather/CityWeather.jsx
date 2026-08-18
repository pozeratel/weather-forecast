import { useEffect, useState } from "react";
import { FiHeart, FiMenu, FiRefreshCw } from "react-icons/fi";
import { getCurrentWeather } from "../../API/Weather APi/weatherAPI";
import {
  CityWeatherSection,
  ForecastGrid,
  WeatherCard,
  CardHeader,
  CardTitle,
  CardSubtitle,
  TimeValue,
  ToggleRow,
  ToggleButton,
  ToggleButtonActive,
  DateRow,
  DateText,
  DayText,
  WeatherVisual,
  SunIcon,
  Temperature,
  CardFooter,
  FavoriteButton,
  SeeMoreButton,
  MenuButton,
  RefreshButton,
} from "./CItyWeather.styled";

const countryNames = {
  CZ: "Czech Republic",
  UA: "Ukraine",
  US: "United States",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  PL: "Poland",
};

const formatWeatherCard = (weather, index) => {
  const timestamp = weather.dt * 1000;

  return {
    city: weather.name || "Prague",
    country: countryNames[weather.sys?.country] || "Czech Republic",
    time: new Date(timestamp).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    date: new Date(timestamp).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(timestamp),
    ),
    temp: `${Math.round(weather.main.temp)}°C`,
  };
};

export const CityWeather = ({ searchTerm = "", cities = [] }) => {
  const [cards, setCards] = useState([]);
  const [loadingCities, setLoadingCities] = useState({});

  useEffect(() => {
    const loadWeather = async () => {
      if (!cities.length) {
        setCards([]);
        return;
      }

      try {
        const responses = await Promise.all(
          cities.map((city) => getCurrentWeather(city)),
        );

        const nextCards = responses.map((weather) => formatWeatherCard(weather));

        setCards(nextCards);
      } catch (error) {
        setCards([]);
      }
    };

    loadWeather();
  }, [cities]);

  const handleRefresh = async (city) => {
    setLoadingCities((prev) => ({ ...prev, [city]: true }));
    try {
      const weather = await getCurrentWeather(city);
      const updatedCard = formatWeatherCard(weather);
      setCards((prev) => [
        ...prev.map((card) => 
          card.city === city ? { ...updatedCard } : card
        ),
      ]);
    } catch (error) {
      console.error("Failed to refresh weather:", error);
    } finally {
      setLoadingCities((prev) => ({ ...prev, [city]: false }));
    }
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredCards = normalizedSearchTerm
    ? cards.filter(({ city, country }) =>
        `${city} ${country}`.toLowerCase().includes(normalizedSearchTerm),
      )
    : cards;

  return (
    <CityWeatherSection>
      <ForecastGrid>
        {filteredCards.length > 0 ? (
          filteredCards.map(({ city, country, time, date, day, temp }, index) => (
            <WeatherCard key={`${city}-${index}`}>
              <CardHeader>
                <div>
                  <CardTitle>{city}</CardTitle>
                  <CardSubtitle>{country}</CardSubtitle>
                </div>
                <RefreshButton
                  type="button"
                  onClick={() => handleRefresh(city)}
                  disabled={loadingCities[city]}
                  aria-label={`Refresh ${city} weather`}
                  title="Оновити інформацію"
                >
                  <FiRefreshCw />
                </RefreshButton>
              </CardHeader>

              <TimeValue>{time}</TimeValue>

              <ToggleRow>
                <ToggleButtonActive type="button">Hourly forecast</ToggleButtonActive>
                <ToggleButton type="button">Weekly forecast</ToggleButton>
              </ToggleRow>

              <DateRow>
                <DateText>{date}</DateText>
                <DayText>{day}</DayText>
              </DateRow>

              <WeatherVisual aria-label={`${city} weather`}>
                <SunIcon />
              </WeatherVisual>

              <Temperature>{temp}</Temperature>

              <CardFooter>
                <FavoriteButton type="button" aria-label={`Save ${city}`}>
                  <FiHeart />
                </FavoriteButton>

                <SeeMoreButton type="button">See more</SeeMoreButton>

                <MenuButton type="button" aria-label={`Open ${city} menu`}>
                  <FiMenu />
                </MenuButton>
              </CardFooter>
            </WeatherCard>
          ))
        ) : (
          <p>No matching cities or countries found.</p>
        )}
      </ForecastGrid>
    </CityWeatherSection>
  );
};
