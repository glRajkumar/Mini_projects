import React from 'react'
import tab1 from '../img/netflix/tab-content-1.png'

function TabConOne() {
    return (
        <section className="tab-content">
            <div className="tabcontainer">
                <div id="tab-1-content" className="tab-content-item show">
                    <div className="tab-1-content-inner">
                        <div>
                            <p className="text-lg">
                                If you decide Netflix isn't for you - no problem. No commitment.
                                Cancel online anytime.
                            </p>
                            <a href="/" className="btn btn-lg">Watch Free For 30 Days</a>
                        </div>
                        <img src={tab1} alt="tab" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TabConOne