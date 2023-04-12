import React from "react";
import {useEffect} from "react";
import PropTypes from "prop-types";
import "./DealCard.scss";
import {useDealLookup} from "../../api/CheapSharkAPI";
import Spinner from "../Spinner";

function DealCard(props) {

    //Deal Lookup API Call
    const {data: dealLookupData, error: dealLookupError, status: dealLookupStatus,
        isLoading: dealLookupIsLoading, isRefetching: dealLookupIsRefetching, refetch: refetchDealLookup,
        dataUpdatedAt: dealLookupUpdatedAt} = useDealLookup(props.deal.dealID);
    useEffect(() => {

    }, [dealLookupData]);

    return (
        <div className="card deal-card-outer">
            { dealLookupData
                ?
                    <><img src={"s"} className="card-img-top deal-card-image" alt="deal image"/>
                    <div className="card-body deal-card-body">
                        <h5 className="card-title deal-card-title">Card title</h5>
                        <p className="card-text deal-card-body">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div> </>

                :   <div className={"d-flex justify-content-center align-items-center"}>
                        <Spinner/>
                    </div>

            }

        </div>
    );
}

DealCard.propTypes = {
    deal: PropTypes.object.isRequired
};
export default DealCard;