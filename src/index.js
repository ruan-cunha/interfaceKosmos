import { useState } from "react";
import { useRouter, } from "next/router";
import { firebase } from "./initFirebase";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, Home} from './App';


ReactDOM.render(
  <React.StrictMode>
    <Home />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
