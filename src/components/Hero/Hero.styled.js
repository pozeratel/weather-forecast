import styled from "styled-components";
import heroSunset from "../../images/hero-sunset.png";

export const HeroSection = styled.section`
  position: relative;
  min-height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background:
    linear-gradient(
      180deg,
      rgba(20, 10, 10, 0.35) 0%,
      rgba(15, 8, 8, 0.55) 60%,
      rgba(10, 6, 8, 0.85) 100%
    ),
    url(${heroSunset}) center / cover no-repeat;
  background-color: #1a1210;
  text-align: center;
  overflow: hidden;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
`;

export const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  margin-bottom: 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  color: #f5f0ea;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const HeroTitle = styled.h1`
  margin: 0 0 16px;
  color: #ffffff;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  letter-spacing: -0.01em;
`;

export const HeroText = styled.p`
  margin: 0 0 32px;
  max-width: 460px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
  line-height: 1.6;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 18px;
  font-size: 14px;
  color: #2b2320;
  background: transparent;

  &::placeholder {
    color: #8a8177;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 100%;
  padding: 14px;
  border: none;
  cursor: pointer;
  background: #f2994a;
  color: #ffffff;
  transition: background 0.2s ease;

  &:hover {
    background: #e6863a;
  }

  &::before {
    content: "";
    width: 18px;
    height: 18px;
    background: currentColor;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E")
      center / contain no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E")
      center / contain no-repeat;
  }
`;

export const HeroNote = styled.p`
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
`;
