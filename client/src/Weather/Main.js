import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Main(props) {
    return (
        <section className="weatherinfo">
            {/* <h2>{props.city}  ,  {props.country}</h2>  instead those , below alternate*/}
            { props.city ? (<h2>{props.city}</h2>) : null}

            {props.icon && <FontAwesomeIcon icon={props.icon} size="3x" />}

            { props.temp_celsius ? (<h3>{props.temp_celsius}&deg;C</h3>) : null}

            {/* showing min and max values */}
            {minmax(props.temp_min, props.temp_max)}

            { props.description ? (<h3>{props.description.charAt(0).toUpperCase() + props.description.slice(1)}</h3>) : null}

            {/* <h3>{props.description.charAt(0).toUpperCase() + props.description.slice(1)}</h3> */}
        </section>
    )
}

function minmax(min, max) {
    if (min && max) {
        return (
            <h4>
                <span style={{ paddingRight: '0.5em' }}>{min}&deg;C</span> {' - '}
                <span style={{ paddingLeft: '0.5em' }}>{max}&deg;C</span>
            </h4>
        )
    }
}

export default Main