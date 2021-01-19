import React from 'react'
import axios from 'axios'
import FormOW from './FormOW'
import Main from './Main'

class OpenWeather extends React.Component {
  constructor() {
    super()

    this.state = {
      city: '',
      icon: '',
      celsius: '',
      temp_min: '',
      temp_max: '',
      description: '',
      error: false,
      errAx: false
    }

    // this.getWeatherByOW() -> no need to call method because we call it in form submit

    this.WeatherIcon = {
      Thunder: "bolt",
      Drizzle: "tint",
      Rain: "cloud-rain",
      Snow: "snowflake",
      Fog: "smog",
      Clear: "cloud-sun",
      Cloud: "cloud"
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  getWeatherIcon = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: icons.Thunder })
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle })
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: icons.Rain })
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow })
        break;

      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icon: icons.Fog })
        break;

      case rangeId >= 800 && rangeId <= 804:
        this.setState({ icon: icons.Cloud })
        break;

      default: this.setState({ icon: icons.Clear })
    }
  }

  getWeatherByOW = (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      axios.post("/weather/open", { city, country })
        .then((res) => {
          // console.log(res.data)
          this.setState({
            city: res.data.ans.city,
            celsius: this.calCelsius(res.data.ans.celsius),
            temp_max: this.calCelsius(res.data.ans.temp_max),
            temp_min: this.calCelsius(res.data.ans.temp_min),
            description: res.data.ans.description
          })

          //setting the icon 
          this.getWeatherIcon(this.WeatherIcon, res.data.ans.icon)
        })
        .catch((err) => {
          // console.log(err)
          this.setState({ errAx: true })
        })

    } else {
      this.setState({ error: true })
    }
  }


  render() {
    return (
      <section id="secal1">
        <FormOW loadWeather={this.getWeatherByOW} error={this.state.error} />

        {this.state.errAx ? (<h3>Please Try again</h3>) : ''}

        <Main
          city={this.state.city}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          icon={this.state.icon}
        />

      </section>
    )
  }
}

export default OpenWeather