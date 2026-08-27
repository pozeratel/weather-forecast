import styled from "styled-components";

export const HeaderRoot = styled.header`
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  min-height: 52px;
  max-width: 448px;
  margin: 0 auto;
  padding: 10px 16px;
  background: #fff;

  @media (min-width: 768px) {
    min-height: 53px;
    max-width: 704px;
    padding: 10px 48px;
  }

  @media (min-width: 1200px) {
    width: 100%;
    max-width: 1200px;
    min-height: 72px;
    padding: 12px clamp(56px, 8vw, 154px);
  }
`;

export const Brand = styled.a`
  width: 56px;
  color: #171717;
  line-height: 0.72;
  text-decoration: none;
  transform: rotate(-7deg);

  @media (min-width: 1200px) {
    width: 72px;
  }
`;

export const BrandNumber = styled.span`
  display: block;
  font: 800 italic 18px/.75 "Comic Sans MS", "Segoe Print", cursive;
  letter-spacing: -2px;

  @media (min-width: 1200px) {
    font-size: 24px;
  }
`;

export const BrandName = styled.span`
  display: block;
  margin-left: 8px;
  font: 700 italic 9px/.8 "Comic Sans MS", "Segoe Print", cursive;
  letter-spacing: -0.8px;

  @media (min-width: 1200px) {
    font-size: 11px;
  }
`;

export const Nav = styled.nav`
  display: none;

  a {
    color: #111;
    font: 400 8px/1 Arial, sans-serif;
    text-decoration: none;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    gap: clamp(20px, 4vw, 33px);
    margin-left: clamp(42px, 8vw, 67px);
  }

  @media (min-width: 1200px) {
    gap: clamp(34px, 3vw, 58px);
    margin-left: clamp(74px, 7vw, 136px);

    a {
      font-size: 12px;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;

  p {
    margin: 0;
    font-size: 10px;
  }

  @media (min-width: 768px) {
    gap: 18px;
  }
`;

export const SignUpButton = styled.button`
  padding: 8px 12px;
  border: 0;
  border-radius: 7px;
  color: #111;
  background: #ffb45d;
  font: 400 8px/1 Arial, sans-serif;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%);
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 8px 14px;
  }

  @media (min-width: 1200px) {
    padding: 11px 19px;
    border-radius: 8px;
    font-size: 12px;
  }
`;

export const ProfileButton = styled.button`
  position: relative;
  width: 33px;
  height: 33px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 50%;
  background: #627094;
  cursor: pointer;

  @media (min-width: 1200px) {
    width: 42px;
    height: 42px;
  }
`;

export const ProfileHead = styled.span`
  position: absolute;
  top: 6px;
  left: 50%;
  display: block;
  width: 11px;
  height: 13px;
  border-radius: 50%;
  background: #f8f8f8;
  transform: translateX(-50%);

  @media (min-width: 1200px) {
    top: 7px;
    width: 14px;
    height: 16px;
  }
`;

export const ProfileBody = styled.span`
  position: absolute;
  bottom: -9px;
  left: 50%;
  display: block;
  width: 25px;
  height: 22px;
  border-radius: 50% 50% 0 0;
  background: #f8f8f8;
  transform: translateX(-50%);

  @media (min-width: 1200px) {
    bottom: -11px;
    width: 31px;
    height: 27px;
  }
`;
