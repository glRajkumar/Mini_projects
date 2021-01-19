import React from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faBolt, faCloud, faCloudRain, faCloudSun, faTint, faSmog, faSnowflake, faWind} from '@fortawesome/free-solid-svg-icons'
import OpenWeather from './Components/OpenWeather';
import DarkSky from './Components/DarkSky';


library.add(faBolt, faCloud, faCloudRain, faCloudSun, faTint, faSmog, faSnowflake, faWind)

function App()  {
    return (
      <section className="App">
        <header><h1>Weather Info</h1></header>
      
        <p>In this page, you can compare two famous Weather APIs named Open Weather API and Dark Sky API.</p>
        <p>To access Open Weather API, You just need to give the names of your City and Country only</p>
        <p>To access Dark Sky API, You need to give your place's Latitude and Langitude</p> 
        
        <section id="sec">
          <OpenWeather></OpenWeather>
          <DarkSky></DarkSky>
        </section>      
      </section>
    );  
}
  
export default App;