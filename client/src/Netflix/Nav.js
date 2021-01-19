import React from 'react'
import logo from '../img/netflix/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Nav() {
	return (
		<header className="showcase">
			<div className="showcase-top">
				<img src={logo} alt="netflix" />
				<a href="/" className="btn btn-rounded">Sign In</a>
			</div>
			<div className="showcase-content">
				<h1>See what's next</h1>
				<p>Watch anywhere. Cancel Anytime</p>
				<a href="/" className="btn btn-xl">
					Watch Free For 30 Days
					<FontAwesomeIcon icon="chevron-right" className="btn-icon" />
				</a>
			</div>
		</header>
	)
}

export default Nav