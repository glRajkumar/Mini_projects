import React from 'react'

function FormDS(props) {
  return (
    <>
      <h3>Dark Sky API</h3>

      <form onSubmit={props.loadWeather}>
        <div className="error">{props.error ? error() : ''}</div>

        <label><strong>Enter your Latitude :</strong></label>
        <input
          className="input-box"
          type="text"
          name="latitude"
          placeholder="xx.xx"
        />

        <label><strong>{`Enter your Langitude     :`}</strong></label>
        <input
          className="input-box"
          type="text"
          name="langitude"
          placeholder="yy.yy"
        />

        <button className="gen-but">Get Weather</button>
      </form>
    </>
  )
}

function error() {
  return (
    <div>
      Please Enter Latitude and Langitude
    </div>
  )
}

export default FormDS