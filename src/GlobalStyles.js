import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

  :root {
    font-family: "Montserrat", sans-serif;
    color: #171717;
    background: #1e1e1e;
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
  }
`;
