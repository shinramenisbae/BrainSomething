import React from 'react'
import Game1 from "../components/Game1"
import ChimpTest from "../components/ChimpTest"

const ChimpTestPage = () => {
    return (
        <div className="ChimpTestPage">
            <div className="dinoGame">
                {/* Render the minigame component */}
                <Game1 />
            </div>
        </div>
    )
}

export default ChimpTestPage