import React from 'react'
import tab21 from './Images/tab-content-2-1.png'
import tab22 from './Images/tab-content-2-2.png'
import tab23 from './Images/tab-content-2-3.png'

function TabConTwo(){
   return(
    <section className="tab-content">
    <div className="container">
    <div id="tab-2-content" className="tab-content-item">
                <div className="tab-2-content-top">
                    <p className="text-lg">
                        Watch TV shows and movies anytime, anywhere — personalized for
                        you.
                    </p>
                    <a href="#" className="btn btn-lg">Watch Free For 30 Days</a>
                </div>
                <div className="tab-2-content-bottom">
                    <div>
                        <img src={tab21} alt="no image found" />
                        <p className="text-md">
                            Watch on your TV
                        </p>
                        <p className="text-dark">
                            Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
                            players and more.
                        </p>
                    </div>
                    <div>
                        <img src={tab22} alt="no image found" />
                        <p className="text-md">
                            Watch instantly or download for later
                        </p>
                        <p className="text-dark">
                            Available on phone and tablet, wherever you go.
                        </p>
                    </div>
                    <div>
                        <img src={tab23} alt="no image found" />
                        <p className="text-md">
                            Use any computer
                        </p>
                        <p className="text-dark">
                            Watch right on Netflix.com.
                        </p>
                    </div>
                </div>
            </div>
    </div>
    </section>
   )
}

export default TabConTwo