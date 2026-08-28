import styled from "styled-components";
import {
  WiThermometer,
  WiRaindrop,
  WiBarometer,
  WiStrongWind,
  WiDaySunny,
} from "react-icons/wi";

export const WeatherInfoSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 42px;
  background: ${({ theme }) => theme.sectionBackground};
`;

export const InfoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  @media (max-width: 570px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.article`
  width: 100%;
  max-width: 240px;
  padding: 20px 18px;
  border-radius: 18px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  min-height: 160px;
`;

export const InfoLabel = styled.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.mutedText};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.highlightedText};
  line-height: 1.2;
`;

export const InfoIcon = styled.div`
  font-size: 48px;
  color: #f4b23e;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 8px rgba(244, 178, 62, 0.2));
`;

export const FeelsLikeIcon = styled(WiThermometer)``;
export const HumidityIcon = styled(WiRaindrop)``;
export const PressureIcon = styled(WiBarometer)``;
export const WindIcon = styled(WiStrongWind)``;
export const VisibilityIcon = styled(WiDaySunny)``;
