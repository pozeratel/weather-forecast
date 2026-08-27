import styled from "styled-components";

export const ForecastSection = styled.section`
  width: 100%;
  padding: 24px 16px 40px;
  background: #ffffff;
`;

export const ForecastContainer = styled.div`
  width: 100%;
  min-height: 296px;
  margin: 0 auto;
  padding: 16px;
  border-radius: 10px;
  background: #e9e9e9;

  @media (min-width: 768px) {
    padding: 20px 40px 24px;
  }

  @media (min-width: 1200px) {
    padding: 24px 56px 32px;
  }
`;

export const ForecastTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  color: #171717;
`;

export const ForecastList = styled.ul`
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ForecastRow = styled.li`
  display: grid;
  grid-template-columns: minmax(82px, 1fr) 42px minmax(60px, auto) minmax(72px, 1.1fr);
  align-items: center;
  min-height: 32px;
  padding: 2px 10px;
  border-radius: 7px;
  background: #dcdcdc;
  color: #171717;
  font-size: 11px;
  line-height: 1.2;

  @media (min-width: 768px) {
    grid-template-columns: minmax(130px, 1fr) 48px minmax(92px, auto) minmax(140px, 1.1fr);
    min-height: 38px;
    padding: 2px 26px;
  }
`;

export const ForecastDate = styled.time`
  white-space: nowrap;
`;

export const WeatherIcon = styled.img`
  display: block;
  width: 42px;
  height: 42px;
  object-fit: contain;
`;

export const Temperature = styled.span`
  white-space: nowrap;
`;

export const Description = styled.span`
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  text-transform: lowercase;
  white-space: nowrap;
`;

export const StatusMessage = styled.p`
  margin: 0;
  padding: 40px 0;
  color: #595959;
  font-size: 13px;
  text-align: center;
`;
