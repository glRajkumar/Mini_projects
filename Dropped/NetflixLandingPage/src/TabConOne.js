import React from 'react'
import tab1 from './Images/tab-content-1.png'

function TabConOne(){
   return(
    <section class="tab-content">
    <div class="container">
        <div id="tab-1-content" class="tab-content-item show">
            <div class="tab-1-content-inner">
                <div>
                    <p class="text-lg">
                        If you decide Netflix isn't for you - no problem. No commitment.
                        Cancel online anytime.
                    </p>
                    <a href="#" class="btn btn-lg">Watch Free For 30 Days</a>
                </div>
                <img src={tab1} alt="no image found" />
            </div>
        </div>
    </div>
    </section>
   )
}

export default TabConOne