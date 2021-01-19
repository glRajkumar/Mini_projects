import React from 'react'

function FormDS(props){
        return(
             <>
               <h3>Dark Sky API</h3>
                <form onSubmit={props.loadWeather}>
                  <div>{props.error ? error() : ''}</div>
                    <label><strong>{`Enter your Latitude     :`}</strong></label>
                      <input type="text" name="latitude" placeholder="Latitude" autoComplete="off" /><br />
                    <label><strong>{`Enter your Langitude     :`}</strong></label>
                      <input type="text" name="langitude" placeholder="Langitude" autoComplete="off" /><br />
                    <button>Get Weather</button>
                </form>
             </>
              )
}

function error(){
  return(
    <div>
      Please Enter Latitude and Langitude
    </div>
  )
}

export default FormDS