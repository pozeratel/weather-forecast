import styled from "styled-components";
import { WiDaySunny } from "react-icons/wi";

export const CityWeatherSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 42px;
  background: #ffffff;
`;

export const ForecastGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 22px;
  justify-items: center;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media (max-width: 570px) {
    grid-template-columns: 1fr;
  }
`;

export const WeatherCard = styled.article`
  width: 100%;
  max-width: 290px;
  min-height: 390px;
  display: flex;
  flex-direction: column;
  padding: 20px 18px 14px;
  border-radius: 18px;
  background: #d7d7d7;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 600;
  color: #111111;
`;

export const CardSubtitle = styled.span`
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
  color: #4d4d4d;
`;

export const TimeValue = styled.div`
  margin: 4px 0 10px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  color: #111111;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const ToggleButton = styled.button`
  flex: 1;
  border: none;
  background: transparent;
  padding: 5px 0;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
  color: #707070;
  cursor: pointer;
`;

export const ToggleButtonActive = styled(ToggleButton)`
  color: #1b1b1b;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 8px;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 11px;
  line-height: 1.3;
  font-weight: 500;
  color: #5f5f5f;
`;

export const DateText = styled.span``;

export const DayText = styled.span``;

export const WeatherVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  margin: 8px 0 10px;
`;

export const SunIcon = styled(WiDaySunny)`
  font-size: 118px;
  color: #f4b23e;
  filter: drop-shadow(0 8px 16px rgba(244, 178, 62, 0.35));
`;

export const Temperature = styled.p`
  margin: 0;
  text-align: center;
  font-size: 38px;
  line-height: 1;
  font-weight: 700;
  color: #111111;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 16px;
`;

export const FavoriteButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isFavorite }) => ($isFavorite ? "#e84f5f" : "#ff7a7a")};
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 5px 12px rgba(255, 122, 122, 0.25);

  svg {
    fill: ${({ $isFavorite }) => ($isFavorite ? "currentColor" : "none")};
  }
`;

export const SeeMoreButton = styled.button`
  flex: 1;
  min-height: 34px;
  border: none;
  border-radius: 12px;
  background: #efefef;
  color: #2b2b2b;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

export const RemoveButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff0f0;
  color: #c94848;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #ffdada;
  }
`;

export const RefreshButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
  color: #2b2b2b;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.6);
    transform: rotate(180deg);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
