import React from "react";
import {useRef, useState, useEffect} from "react";
import "./SearchPage.scss";
import Searchbar from "../../components/Searchbar/Searchbar";
import {useGameLookup, useGetListOfGames, useGetStoresInfo} from "../../api/CheapSharkAPI";
import GameResultCard from "../../components/GameResultCard/GameResultCard";
import DealCard from "../../components/DealCard/DealCard";

export default function SearchPage() {

    const searchTitleRef = useRef({value: ""});
    const [searchTitle, setSearchTitle] = useState("");

    const [currentGameID, setCurrentGameID] = useState("");


    //List of Games API Call
    const {data: searchData, error: searchDataError, status: searchDataStatus,
        isLoading: searchDataIsLoading, isRefetching: searchDataIsRefetching, refetch: refetchSearchData,
        dataUpdatedAt: searchDataUpdatedAt} = useGetListOfGames(searchTitle, !!searchTitle);
    useEffect(() => {

    }, [searchData]);


    //Game Lookup API Call
    const {data: gameLookupData, error: gameLookupError, status: gameLookupStatus,
        isLoading: gameLookupIsLoading, isRefetching: gameLookupIsRefetching, refetch: refetchGameLookup,
        dataUpdatedAt: gameLookupUpdatedAt} = useGameLookup(currentGameID, !!currentGameID);
    useEffect(() => {

    }, [gameLookupData]);

    //Stores Info API Call
    const {data: storesInfoData, error: storesInfoError, status: storesInfoStatus,
        isLoading: storesInfoIsLoading, isRefetching: storesInfoIsRefetching, refetch: refetchStoresInfo,
        dataUpdatedAt: storesInfoUpdatedAt} = useGetStoresInfo();
    useEffect(() => {

    }, [storesInfoData]);



    /* On Game Search Change*/
    const onSearchChange = () => {
        setSearchTitle(searchTitleRef.current.value);
    }
    useEffect(() => {
        refetchSearchData().then();
    }, [searchTitle])

    /* END On Game Search Change */


    /* On Game Result Click */

    useEffect(() => {
        setSearchTitle("");
        searchTitleRef.current.value = "";
        if (currentGameID !== "") { refetchGameLookup().then(); }
    }, [currentGameID]);

    /* END On Game Result Click */


    /* Find Store info by ID */
    const findStoreById = (storeID) => {
        if (storesInfoData) {
            for (let i = 0; i < storesInfoData.length; i++) {
                if (storesInfoData[i].storeID === storeID) {
                    return storesInfoData[i];
                }
            }
        }
        else {
            refetchStoresInfo().then(() => {
                findStoreById(storesInfoData);
            });
        }
        return null;
    }
     /* END Find Stores info by ID */
    return (
      <div className={"d-inline vh-100 w-100 justify-content-center align-items-center text-center"}>
          <div className={"d-inline w-100 search-container justify-content-center align-items-center text-center"}>
              <div className={"d-flex w-100 mt-4 justify-content-center"}>
                  <Searchbar setRef={searchTitleRef} onChange={onSearchChange}
                    hasBoxShadow={searchData && searchData.length === 0}/>
              </div>
              <div className={"d-flex justify-content-center align-items-center"}>
                  {searchData
                      && <div className={`w-50 game-search-container ${searchTitle.trim() === "" && "d-none"}`}>
                          {searchData.length > 0 ? searchData.map((result) => (
                              <GameResultCard result={result} setCurrentGameID={setCurrentGameID}/>
                          ))
                              : <p>No Results Found</p>
                          }
                      </div>

                  }

              </div>
              { gameLookupData &&
                  <div className={"w-100 mt-4"}>
                      <h1 >Deals for</h1>
                      <span className={"inline-game-card"}>{gameLookupData.info.title}</span>
                  </div>
              }
          </div>
          <div className={"results-container d-flex justify-content-center align-items-center w-100"}>
              { gameLookupData !== undefined && gameLookupData.info !== undefined &&
                  <div className={"row d-flex justify-content-center align-items-center w-100"}>
                      { gameLookupData.deals.map((deal) => (
                          <DealCard deal={deal} store={findStoreById(deal.storeID)}/>
                      ))

                      }
                  </div>
              }
          </div>
      </div>
    );
}