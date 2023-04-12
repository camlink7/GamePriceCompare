import React from "react";
import {useState, useEffect} from "react";
import './Searchbar.scss';
import PropTypes from "prop-types";
import {INPUT_UPDATE_WAIT} from "../../utils";

function Searchbar(props) {

    const [boxShadow, setBoxShadow] = useState(true);
    useEffect(() => {
        setBoxShadow(props.hasBoxShadow);
    }, [props.hasBoxShadow]);

    //Use a timer to only call the change after the user fully stops typing
    const [timer, setTimer] = useState(null);
    const handleChange = () => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            if (props.onChange) {
                props.onChange();
            }
        }, INPUT_UPDATE_WAIT);

        setTimer(newTimer);
    }

    //On Mount
    useEffect(() => {
        if (props.hasBoxShadow === undefined) {
            setBoxShadow(true);
        }
        else {
            setBoxShadow(props.hasBoxShadow);
        }
    }, []);


    return (
        <div className={`input-group searchbar-outer w-50`}>
            <input type="text" className={`form-control searchbar-input ${!boxShadow && "no-box-shadow"}`}
                   placeholder="Search a video game..."
                   aria-label="Search for video game" aria-describedby="search-icon" ref={props.setRef}
                   onChange={handleChange}/>
            <span className={`input-group-text searchbar-icon-outer ${!boxShadow && "no-box-shadow"}`}
                  id="search-icon">
                <i className="bi bi-search"></i>
            </span>
        </div>
    );
}

Searchbar.propTypes = {
    onChange: PropTypes.func,
    setRef: PropTypes.any.isRequired,
    hasBoxShadow: PropTypes.bool
}
export default Searchbar;