import React from 'react'
import axios from 'axios'
import FormDS from './FormDS'
import Main from './Main'

class DarkSky extends React.Component{
    constructor(){
        super()

        this.state = {
            langitude:'',
            latitude:'',
            city: '',
            icon:'',
            celsius:'',
            temp_min:'',
            temp_max:'',
            description:'',
            error: false,
            errAx:false
        }
     
        this.icons ={
          'cloudly' :'cloud', 
          'partly-cloudly-day':'cloud', 
          'partly-cloudly-night':'cloud',
          'rain':'cloud-rain',
          'sleet': 'cloud-rain',
          'snow':'snowflake',
          'wind':'wind',
          'fog':'smog',
          'sun':'cloud-sun'
        }
    }

    getIcon =(ic, value) =>{
       switch(true){
         case value === 'cloudly' || 'partly-cloudly-day' || 'partly-cloudly-night' : this.setState({icon : ic.cloudly}) 
         break;
         case value === 'rain' || 'sleet' : this.setState({icon : ic.rain}) 
         break;
         case value === 'snow' : this.setState({icon : ic.snow}) 
         break;
         case value === 'wind' : this.setState({icon : ic.wind})  
         break;
         case value === 'fog' : this.setState({icon : ic.fog})       
         break;
         default : this.setState({icon : ic.sun}) 
        }
    }

    getWeatherByDS = (e) =>{
        e.preventDefault()
    
        const langitude = e.target.elements.langitude.value;
        const latitude = e.target.elements.latitude.value;
    
        if(langitude && latitude){
    
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/{your-api-key}/${latitude},${langitude}?units=si`
         
        axios.get(url)
        .then((res) => {
          // console.log(res.data)
          this.setState({
            city : res.data.timezone,
            celsius : res.data.currently.temperature ,
            temp_max : res.data.daily.data[0].temperatureHigh,
            temp_min : res.data.daily.data[0].temperatureLow,        
            description : res.data.currently.summary              
          })

          this.getIcon(this.icons ,res.data.currently.icon)
        })
        .catch((err) => {
          // console.log(err)
          this.setState({errAx : true})
        })
    
      }else{
          this.setState({error: true})
        }         
    }

    render(){
        return(
            <section id="secal2">
              <FormDS loadWeather={this.getWeatherByDS} error={this.state.error} />
          
              {this.state.errAx ? (<h3>Please Try again</h3>):''}
          
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

export default DarkSky
