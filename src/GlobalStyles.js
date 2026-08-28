import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: "Montserrat", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-width: 320px;
    min-height: 100%;
    margin: 0;
  }

  body {
    min-height: 100vh;
    font-family: "Montserrat", sans-serif;
    background: ${({ theme }) => theme.appBackground};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease, color 0.2s ease;
  }

  button,
  input {
    font-family: inherit;
  }
`;
