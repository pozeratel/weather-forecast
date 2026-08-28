

import {
  WeatherInfoSection,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  InfoIcon,
  FeelsLikeIcon,
  HumidityIcon,
  PressureIcon,
  WindIcon,
  VisibilityIcon,
} from "./WeatherInfo.styled";
import { PageContainer } from "../PageContainer/PageContainer.styled";

export const WeatherInfo = ({
  feelsLike = "--",
  minTemp = "--",
  maxTemp = "--",
  humidity = "--",
  pressure = "--",
  windSpeed = "--",
  visibility = "--",
} = {}) => {
  return (
    <WeatherInfoSection id="weather-details">
      <PageContainer>
        <InfoGrid>
        <InfoCard>
          <InfoLabel>Feels like</InfoLabel>
          <InfoIcon>
            <FeelsLikeIcon />
          </InfoIcon>
          <InfoValue>{feelsLike}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Min °C</InfoLabel>
          <InfoValue>{minTemp}</InfoValue>
          <InfoLabel>Max °C</InfoLabel>
          <InfoValue>{maxTemp}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Humidity</InfoLabel>
          <InfoIcon>
            <HumidityIcon />
          </InfoIcon>
          <InfoValue>{humidity}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Pressure</InfoLabel>
          <InfoIcon>
            <PressureIcon />
          </InfoIcon>
          <InfoValue>{pressure}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Wind speed</InfoLabel>
          <InfoIcon>
            <WindIcon />
          </InfoIcon>
          <InfoValue>{windSpeed}</InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoLabel>Visibility</InfoLabel>
          <InfoIcon>
            <VisibilityIcon />
          </InfoIcon>
          <InfoValue>{visibility}</InfoValue>
        </InfoCard>
        </InfoGrid>
      </PageContainer>
    </WeatherInfoSection>
  );
};
