import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; 
  }

  html,
  body,
  #root {
    height: 100%;
  }

  #root { 
    display: flex;
    justify-content: center;
    align-items: center;
  }

  body {
    background-color: #333;
    color: #ffffff;
    font-family: 'Cairo', sans-serif;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyles />
    <App className="App" />
  </>,
  document.getElementById('root'),
);
