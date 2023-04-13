import React from "react";
import PropTypes from "prop-types";
import "./HeaderBar.scss";

function HeaderBar(props) {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <span className="navbar-brand title mb-0">Game Price Finder</span>
            </div>
        </nav>
    );
}

HeaderBar.propTypes = {

}
export default HeaderBar;