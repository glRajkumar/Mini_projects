import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <div className="modalBox">
        <h3>
            You should login first or if you new to our web, Please signup.
            <Link to="/signup">Signup</Link> or 
            <Link to="/login">Login</Link>
        </h3>
    </div>
)