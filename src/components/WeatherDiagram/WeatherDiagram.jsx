import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getHourlyForecast } from "../../API/Weather APi/weatherAPI";
import { DiagramSection, DiagramTitle, ChartContainer, DiagramWrapper } from "./WeatherDiagram.styled";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {payload[0].payload.time}
        </p>
        <p style={{ margin: "4px 0 0", color: "#FFA500" }}>
          {payload[0].value.toFixed(1)}°C
        </p>
      </div>
    );
  }
  return null;
};

export const WeatherDiagram = ({ city = "Prague" }) => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 300 });

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const data = await getHourlyForecast(city);
        const formattedData = data.map((item) => {
          const date = new Date(item.dt * 1000);
          return {
            time: date.toLocaleString("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            temp: Number(item.main.temp.toFixed(1)),
          };
        });
        setForecastData(formattedData);
        setError(null);
      } catch (err) {
        console.error("Failed to load hourly forecast:", err);
        setError("Не вдалося завантажити прогноз");
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("chart-container");
      if (container) {
        setDimensions({
          width: Math.max(300, container.clientWidth - 40),
          height: 300,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <DiagramSection>
        <DiagramTitle>Прогноз за годинами</DiagramTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          Завантаження...
        </div>
      </DiagramSection>
    );
  }

  if (error || !forecastData.length) {
    return (
      <DiagramSection>
        <DiagramTitle>Прогноз за годинами</DiagramTitle>
        <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
          {error || "Дані недоступні"}
        </div>
      </DiagramSection>
    );
  }

  return (
    <DiagramSection>
      <DiagramTitle>Прогноз за годинами</DiagramTitle>
      <ChartContainer id="chart-container">
        <DiagramWrapper>
          <LineChart
            width={dimensions.width}
            height={dimensions.height}
            data={forecastData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="time"
              stroke="#666"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#666"
              style={{ fontSize: "12px" }}
              label={{ value: "°C", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#FFA500"
              strokeWidth={2.5}
              dot={{ fill: "#FFA500", r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </DiagramWrapper>
      </ChartContainer>
    </DiagramSection>
  );
};
