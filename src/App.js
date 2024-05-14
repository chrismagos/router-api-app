import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Components/Home';
import Layout from './Components/Layout';
import Contact from "./Components/Contact";
import Weather from './Components/Weather';
import Spotify from './Components/Spotify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="weather" element={<Weather />} />
          <Route path="spotify" element={<Spotify />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
