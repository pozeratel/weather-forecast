import styled from "styled-components";

export const FooterRoot = styled.footer`
  flex-shrink: 0;
  width: 100%;
  background: #1e1e1e;

  @media (min-width: 520px) {
    padding-right: 24px;
    padding-left: 24px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 105px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px clamp(24px, 10.8vw, 94px);
  background: #ffb266;

  @media (max-width: 520px) {
    flex-wrap: wrap;
    gap: 22px 30px;
    padding: 24px 30px;
  }
`;

export const Brand = styled.a`
  width: 58px;
  color: #111;
  line-height: 0.72;
  text-decoration: none;
  transform: rotate(-7deg);
`;

export const BrandNumber = styled.span`
  display: block;
  font:
    800 italic 18px/0.75 "Comic Sans MS",
    "Segoe Print",
    cursive;
  letter-spacing: -2px;
`;

export const BrandName = styled.span`
  display: block;
  margin-left: 8px;
  font:
    700 italic 9px/0.8 "Comic Sans MS",
    "Segoe Print",
    cursive;
  letter-spacing: -0.8px;
`;

export const Address = styled.address`
  display: flex;
  flex-direction: column;
  margin-left: clamp(32px, 5.5vw, 48px);
  color: #111;
  font:
    400 8px/1.23 Arial,
    sans-serif;
  font-style: normal;

  @media (max-width: 520px) {
    margin-left: 0;
  }
`;

export const Socials = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: clamp(40px, 4.7vw, 56px);
  color: #111;
  font:
    400 8px/1.23 Arial,
    sans-serif;

  @media (max-width: 520px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 13px;
  margin-top: 7px;
`;

export const Social = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover,
  &:focus-visible {
    filter: brightness(0.93);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #111;
    outline-offset: 2px;
  }

  &:nth-child(1) {
    background: radial-gradient(
      circle at 30% 107%,
      #ffd56a 0 20%,
      #f94a6d 45%,
      #a640bf 72%,
      #515bd4 100%
    );
  }

  &:nth-child(2) {
    background: #4267a9;
  }

  &:nth-child(3) {
    background: #55c950;
  }
`;
