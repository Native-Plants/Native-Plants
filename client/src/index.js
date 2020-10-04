import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#687864"
    },
    secondary: {
      main: "#31708E" 
    },
    background: {
      default: "#F7F9FB"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();