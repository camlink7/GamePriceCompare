import React from "react";
import './Searchbar.scss';
import PropTypes from "prop-types";

function Searchbar(props) {


    return (
        <div className="input-group searchbar-outer mb-3 w-50">
            <input type="text" className="form-control searchbar-input" placeholder="Search a video game..."
                   aria-label="Search for video game" aria-describedby="search-icon"/>
                <span className="input-group-text searchbar-icon-outer" id="search-icon">
                    <i className="bi bi-search"></i>
                </span>
        </div>
    );
}

Searchbar.propTypes = {
    onChange: PropTypes.func
}
export default Searchbar;