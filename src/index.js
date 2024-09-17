import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './templates/Home/index';
import reportWebVitals from './reportWebVitals';
import Navbarmenu from './components/menu';
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Estudos from './templates/Estudos';
import Jogos from './templates/Jogos';
import "@fontsource/irish-grover"; // Defaults to weight 400
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <div>
      <BrowserRouter>

        {/* to do: role loggedIn for visible navbar */}
  
        <Navbarmenu />
        
        <Routes> 
          <Route path="/Jogos" element={<Jogos/>}/>
          <Route path="/Estudos" element={<Estudos/>}/>
          <Route path="/" element={<Home/>}/>

          
      </Routes>
      </BrowserRouter>

    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
