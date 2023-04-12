import React from "react";
import PropTypes from "prop-types";
import "./GameResultCard.scss";

function GameResultCard(props) {
    const handleClick = () => {
        props.setCurrentGameID(props.result.gameID);
    }

    return (
        <div className={"game-result-card-outer d-flex"} onClick={handleClick}>
            <div className={"game-result-card-inner w-100 d-flex justify-content-start align-items-center"}>
                <img className="game-result-card-icon" src={props.result.thumb} alt={"game-icon"}/>
                <div className={"d-inline-block mx-3 "}>
                    <h1 className="game-result-card-title fs-4">{props.result.external}</h1>
                    <h1 className={"game-result-card-price d-flex fs-6"}>${props.result.cheapest}</h1>
                </div>
            </div>
        </div>
    );
}

GameResultCard.propTypes = {
    result: PropTypes.object.isRequired,
    setCurrentGameID: PropTypes.any.isRequired
}
export default GameResultCard;