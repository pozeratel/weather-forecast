export const API_KEY =
  import.meta.env.VITE_WEATHER_API_KEY ||
  "b20e7070fd685c4b1d9369f6e21921d8";
export const API_URL = "https://api.openweathermap.org/data/2.5";

const fetchWeatherData = async (endpoint, city) => {
  const normalizedCity = city?.trim();

  if (!normalizedCity) {
    throw new Error("City name is required");
  }

  const response = await fetch(
    `${API_URL}${endpoint}?q=${encodeURIComponent(normalizedCity)}&units=metric&lang=uk&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати погоду");
  }

  return response.json();
};

export const getCurrentWeather = async (city) => {
  return fetchWeatherData("/weather", city);
};

export const getCurrentWeatherByCoords = async (latitude, longitude) => {
  const response = await fetch(
    `${API_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=uk&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати погоду за координатами");
  }

  return response.json();
};

export const getHourlyForecast = async (city) => {
  const data = await fetchWeatherData("/forecast", city);
  return data.list.slice(0, 17);
};
