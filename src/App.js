import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/Home';
import Layout from './Components/Layout';
import Weather from './Components/Weather';
import Spotify from './Components/Spotify';
import Artist from './Components/Artist';
import Album from './Components/Album';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="weather" element={<Weather />} />
          <Route path="spotify" element={<Spotify />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="album/:id" element={<Album />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
