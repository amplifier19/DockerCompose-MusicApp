import React, { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
import "./Counter.css"

const Counter = ({ playlistSum, trackSum }) => {
    const [counterOn, setCounterOn] = useState(false)

    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div className="counterContainer">
                <div className='counterWrapper'>
                    <div className="counts">
                        <h2 className='countsH2'>
                            {counterOn && <CountUp start={0} end={playlistSum} duration={2} delay={0} />}
                        </h2>
                    </div>
                    <div className="countsDesc">
                        <h2 className="descH2">
                            Playlists
                        </h2>
                    </div>
                </div>
                <div className="counterWrapper">
                    <div className="counts">
                        <h2 className='countsH2'>
                            {counterOn && <CountUp start={0} end={trackSum} duration={3} delay={0} />}
                        </h2>
                    </div>
                    <div className="countsDesc">
                        <h2 className='descH2'>
                            Tracks
                        </h2>
                    </div>
                </div>
            </div>
        </ScrollTrigger>

    )
}

export default Counter
