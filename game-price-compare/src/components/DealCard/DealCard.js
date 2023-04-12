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
                    <><img src={`https://www.cheapshark.com${props.store.images.banner}`}
                           className="card-img-top deal-card-image mt-3" alt="deal image"/>
                    <div className="card-body deal-card-body">
                        <h5 className="card-title deal-card-price">${props.deal.price}</h5>
                        { props.deal.price < props.deal.retailPrice &&
                            <del className="card-title deal-card-retail-price">${props.deal.retailPrice}</del>
                        }

                        <a href={`https://www.cheapshark.com/redirect?dealID=${props.deal.dealID}`}
                           className="btn btn-primary deal-card-btn mt-3" target="_blank">View in store</a>
                    </div> </>

                :   <div className={"d-flex justify-content-center align-items-center"}>
                        <Spinner/>
                    </div>

            }

        </div>
    );
}

DealCard.propTypes = {
    deal: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
export default DealCard;