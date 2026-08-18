const API_KEY = "b20e7070fd685c4b1d9369f6e21921d8";
const API_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  const response = await fetch(
    `${API_URL}/weather?q=${encodeURIComponent(city)}&units=metric&lang=uk&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати погоду");
  }

  return response.json();
};

export const getHourlyForecast = async (city) => {
  const response = await fetch(
    `${API_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&lang=uk&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Не вдалося отримати прогноз");
  }

  const data = await response.json();
  // Повертаємо перші 17 записів (кожен запис - це 3 години)
  return data.list.slice(0, 17);
};
