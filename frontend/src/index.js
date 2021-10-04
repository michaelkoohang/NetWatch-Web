import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import 'semantic-ui-css/semantic.min.css'
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// NOTE
// We need to add this line above and the 2 comments because of a MapBox issue where the map fails 
// to load when the library is built for production. This line prevents the library from being 
// transpiled, which is what causes the issue in production. Here is a link to the issue: 
// https://github.com/mapbox/mapbox-gl-js/issues/10565.

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
