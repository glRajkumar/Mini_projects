const express = require('express')
const axios = require('axios')
require('dotenv').config()

const router = express.Router()

router.post("/dark", async (req, res) => {
    const { latitude, langitude } = req.body
    let url = `https://api.darksky.net/forecast/${process.env.darkSkyKey}/${latitude},${langitude}?units=si`

    try {
        let { data } = await axios.get(url)
        let ans = {
            city: data.timezone,
            celsius: data.currently.temperature,
            temp_max: data.daily.data[0].temperatureHigh,
            temp_min: data.daily.data[0].temperatureLow,
            description: data.currently.summary,
            icon: data.currently.icon
        }

        res.json({ ans })

    } catch (error) {
        res.status(400).json({ error, msg: "Cannot get information" })
    }
})

router.post("/open", async (req, res) => {
    const { city, country } = req.body
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.openWeatherKey}`

    try {
        let { data } = await axios.get(url)
        let ans = {
            city: `${data.name}, ${data.sys.country}`,
            celsius: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            description: data.weather[0].description,
            icon: data.weather[0].id
        }

        res.json({ ans })

    } catch (error) {
        res.status(400).json({ error, msg: "Cannot get information" })
    }
})

module.exports = router