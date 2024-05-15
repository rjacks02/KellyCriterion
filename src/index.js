import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './pages/Intro.js';
import Game from './pages/Game.js';
import End from './pages/End.js';
import styles from './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      <h1 class = 'Main'>The Kelly Criterion Investment Game</h1>
    <BrowserRouter>
    <Routes>
      <Route index element={<Intro />} />
      <Route path = 'Intro' element={<Intro />} />
      <Route path = 'Game' element={<Game />} />
      <Route path = 'End' element={<End />} />
    </Routes>
  </BrowserRouter>
  </div>
);
