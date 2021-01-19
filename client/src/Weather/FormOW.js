import React from 'react'

function FormOW(props) {
  return (
    <>
      <h3>Open Weather API</h3>

      <form onSubmit={props.loadWeather}>
        <div className="error">{props.error ? error() : ''}</div>

        <label><strong>Enter your City name :</strong></label>
        <input
          className="input-box"
          type="text"
          name="city"
          placeholder="chennai"
        />

        <label><strong>Enter your Country name :</strong></label>
        <input
          className="input-box"
          type="text"
          name="country"
          placeholder="india"
        />

        <button className="gen-but">Get Weather</button>
      </form>
    </>
  )
}

function error() {
  return (
    <div>
      Please Enter City and Country
    </div>
  )
}

export default FormOW