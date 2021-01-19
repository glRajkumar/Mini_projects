import React from 'react'

function FormOW(props){
   return(
        <>
          <h3>Open Weather API</h3>
           <form onSubmit={props.loadWeather}>
           <div>{props.error ? error() : ''}</div>          
             <label><strong>{`Enter your City name    :`}</strong></label>   
               <input type="text" name="city" placeholder="City" autoComplete="off"/><br />
             <label><strong>{`Enter your Country name    :`}</strong></label>
               <input type="text" name="country" placeholder="Country" autoComplete="off"/><br />
             <button>Get Weather</button>
           </form>        
        </>
   )
}

function error(){
   return(
     <div>
       Please Enter City and Country
     </div>
   )
 }

export default FormOW