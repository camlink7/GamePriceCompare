import React from "react";
import PropTypes from "prop-types";

function Spinner(props) {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

Spinner.propTypes = {
    
};
export default Spinner;