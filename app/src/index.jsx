import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import Root from './App';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './index.css';
import store, { history } from "Redux/store/store";

ReactDOM.render(
    <Suspense fallback="loading">
      <Root store = {store} history = {history} />
    </Suspense>,
  document.getElementById("target")
);
