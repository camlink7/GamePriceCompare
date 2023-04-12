import React from "react";
import PropTypes from "prop-types";
import "./GameResultCard.scss";

function GameResultCard(props) {
    return (
        <div className={"game-result-card-outer d-flex m-2"}>
            <div className={"game-result-card-inner w-50 d-flex justify-content-start align-items-center text-center"}>
                <img className="game-result-card-icon" src={props.thumb} alt={"game-icon"}/>
                <h1 className="game-result-card-title fs-2 mx-3">{props.external}</h1>
            </div>
        </div>
    );
}

GameResultCard.propTypes = {
    gameID: PropTypes.string.isRequired,
    external: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired
}
export default GameResultCard;