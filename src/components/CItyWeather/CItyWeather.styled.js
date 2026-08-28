import styled from "styled-components";
import { WiDaySunny } from "react-icons/wi";

export const CityWeatherSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 42px;
  background: ${({ theme }) => theme.sectionBackground};
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
  background: ${({ theme }) => theme.cardBackground};
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
  color: ${({ theme }) => theme.highlightedText};
`;

export const CardSubtitle = styled.span`
  font-size: 11px;
  line-height: 1.2;
  font-weight: 500;
  color: ${({ theme }) => theme.mutedText};
`;

export const TimeValue = styled.div`
  margin: 4px 0 10px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.highlightedText};
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const ToggleButton = styled.button`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardAltBackground};
  padding: 8px 6px;
  font-size: 11px;
  line-height: 1.2;
  font-weight: 600;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.surface};
    border-color: ${({ theme }) => theme.border};
    outline: none;
  }
`;

export const ToggleButtonActive = styled(ToggleButton)`
  color: ${({ theme }) => theme.highlightedText};
  background: linear-gradient(135deg, #ffd36d, #ffb347);
  border-color: rgba(255, 169, 62, 0.8);
  box-shadow: 0 4px 10px rgba(255, 180, 71, 0.28);
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
  color: ${({ theme }) => theme.mutedText};
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
  color: ${({ theme }) => theme.highlightedText};
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
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
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
