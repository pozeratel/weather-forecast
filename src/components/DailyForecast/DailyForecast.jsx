import { useEffect, useState } from "react";
import { getHourlyForecast } from "../../API/Weather APi/weatherAPI";
import {
  ForecastSection,
  ForecastContainer,
  ForecastTitle,
  ForecastList,
  ForecastRow,
  ForecastDate,
  WeatherIcon,
  Temperature,
  Description,
  StatusMessage,
} from "./DailyForecast.styled";
import { PageContainer } from "../PageContainer/PageContainer.styled";

const getDailyForecast = (entries) => {
  const days = new Map();

  entries.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const key = date.toLocaleDateString("en-CA");
    const distanceFromNoon = Math.abs(date.getHours() - 12);
    const current = days.get(key);

    if (!current || distanceFromNoon < current.distanceFromNoon) {
      days.set(key, { entry, distanceFromNoon });
    }
  });

  return [...days.values()].map(({ entry }) => {
    const date = new Date(entry.dt * 1000);

    return {
      id: entry.dt,
      date: new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(date),
      icon: entry.weather[0]?.icon,
      description: entry.weather[0]?.description || "No data",
      temperature: `${Math.round(entry.main.temp_min)}/${Math.round(entry.main.temp_max)}°C`,
    };
  });
};

export const DailyForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadForecast = async () => {
      setLoading(true);
      setError(false);

      try {
        const entries = await getHourlyForecast(city);
        if (isCurrentRequest) {
          setForecast(getDailyForecast(entries));
        }
      } catch (requestError) {
        console.error("Failed to load daily forecast:", requestError);
        if (isCurrentRequest) {
          setForecast([]);
          setError(true);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    if (city) {
      loadForecast();
    }

    return () => {
      isCurrentRequest = false;
    };
  }, [city]);

  return (
    <ForecastSection id="weekly-forecast">
      <PageContainer>
        <ForecastContainer>
        <ForecastTitle>{forecast.length || 5}-day forecast</ForecastTitle>
        {loading ? (
          <StatusMessage>Loading forecast...</StatusMessage>
        ) : error || !forecast.length ? (
          <StatusMessage>Forecast data is unavailable.</StatusMessage>
        ) : (
          <ForecastList>
            {forecast.map(({ id, date, icon, temperature, description }) => (
              <ForecastRow key={id}>
                <ForecastDate>{date}</ForecastDate>
                <WeatherIcon
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt=""
                  width="42"
                  height="42"
                />
                <Temperature>{temperature}</Temperature>
                <Description>{description}</Description>
              </ForecastRow>
            ))}
          </ForecastList>
        )}
        </ForecastContainer>
      </PageContainer>
    </ForecastSection>
  );
};
