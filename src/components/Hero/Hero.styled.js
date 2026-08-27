import styled from "styled-components";
import heroSunset from "../../images/hero-sunset.png";

export const HeroSection = styled.section`
  position: relative;
  min-height: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 24px 42px;
  background:
    linear-gradient(
      90deg,
      rgba(17, 28, 39, 0.88) 0%,
      rgba(17, 28, 39, 0.48) 58%,
      rgba(17, 28, 39, 0.2) 100%
    ),
    url(${heroSunset}) center / cover no-repeat;
  background-color: #172431;
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: 480px;
    padding: 72px 32px 56px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  position: relative;
  max-width: 720px;
  margin: 0 0 24px;
  padding-bottom: 22px;
  color: #ffffff;
  font-size: clamp(2.5rem, 8vw, 5.75rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: 0;

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 56px;
    height: 4px;
    border-radius: 2px;
    background: #f4a261;
    content: "";
  }
`;

export const HeroText = styled.p`
  max-width: 360px;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1rem;
  line-height: 1.55;
`;

export const HeroDetails = styled.div`
  display: flex;
  width: min(100%, 620px);
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const WeatherSummary = styled.div`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: right;

  @media (max-width: 480px) {
    text-align: left;
  }
`;

export const SummaryDate = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
`;

export const SummaryTemperature = styled.p`
  margin: 4px 0 0;
  font-size: 1.125rem;
  font-weight: 700;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: stretch;
  width: min(100%, 420px);
  min-height: 52px;
  margin: 34px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 36px rgba(8, 18, 28, 0.25);
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  min-width: 0;
  padding: 14px 16px;
  font-size: 1rem;
  color: #20313d;
  background: transparent;

  &::placeholder {
    color: #76838b;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 100%;
  padding: 14px;
  border: none;
  cursor: pointer;
  background: #f4a261;
  color: #ffffff;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #e38b4d;
  }

  &:focus-visible {
    outline: 3px solid rgba(244, 162, 97, 0.45);
    outline-offset: -3px;
  }

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: currentColor;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E")
      center / contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E")
      center / contain no-repeat;
  }
`;
