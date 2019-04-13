import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(
  {
    "palette":
    {
      "common":
      {
        "black":"rgba(8, 8, 8, 1)",
        "white":"rgba(255, 255, 255, 1)"
      },
      "background":
      {
        "paper":"rgb(56, 54, 54)",
        "default":"rgba(59, 59, 59, 1)"
      },
      "primary":
      {
        "light":"rgba(103, 58, 183, 1)",
        "main":"rgba(70, 5, 82, 1)",
        "dark":"rgba(81, 45, 168, 1)",
        "contrastText":"rgba(255, 255, 255, 1)"
      },
      "secondary":
      {
        "light":"#000",
        "main":"#000",
        "dark":"#000",
        "contrastText":"rgba(255, 255, 255, 1)"
      },
      "error":
      {
        "light":"#e57373",
        "main":"#f44336",
        "dark":"#d32f2f",
        "contrastText":"rgba(255, 255, 255, 1)"
      },
      "text":
      {
        "primary":"rgba(255, 255, 255, 1)",
        "secondary":"rgba(255, 255, 255, 1)",
        "disabled":"rgba(255, 255, 255, 1)",
        "hint":"rgba(255, 255, 255, 1)"
      }
    },
    "typography": {
      "useNextVariants": true,
    },
  }
);

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
