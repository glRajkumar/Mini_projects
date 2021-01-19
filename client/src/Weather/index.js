import React from 'react'
import OpenWeather from './OpenWeather';
import DarkSky from './DarkSky';
import '../css/weather.css'

function Weather() {
    return (
        <section id="weather-main">
            <header><h1>Weather Info</h1></header>

            <p>In this page, you can compare two famous Weather APIs named Open Weather API and Dark Sky API.</p>
            <p>To access Open Weather API, You just need to give the names of your City and Country only</p>
            <p>To access Dark Sky API, You need to give your place's Latitude and Langitude</p>

            <section id="sec-weather">
                <OpenWeather />
                <DarkSky />
            </section>
        </section>
    )
}

export default Weather
