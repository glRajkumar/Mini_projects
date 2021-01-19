import React from 'react'
import Nav from './Nav';
import TabNav from './TabNav';
import Footer from './Footer';
import '../css/netflix.css'

function Netflix() {
    return (
        <div id="netflix-main">
            <Nav />
            <TabNav />
            <Footer />
        </div>
    )
}

export default Netflix