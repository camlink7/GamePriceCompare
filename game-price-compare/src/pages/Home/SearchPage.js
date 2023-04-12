import React from "react";
import {useRef, useState, useEffect} from "react";
import "./SearchPage.scss";
import Searchbar from "../../components/Searchbar/Searchbar";
import {useGameLookup, useGetListOfGames} from "../../api/CheapSharkAPI";
import GameResultCard from "../../components/GameResultCard/GameResultCard";

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


    //List of Deals API Call
    const {data: gameLookupData, error: gameLookupError, status: gameLookupStatus,
        isLoading: gameLookupIsLoading, isRefetching: gameLookupIsRefetching, refetch: refetchgameLookup,
        dataUpdatedAt: gameLookupUpdatedAt} = useGameLookup(currentGameID, !!currentGameID);
    useEffect(() => {

    }, [gameLookupData]);

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
        if (currentGameID !== "") { refetchgameLookup().then(); }
    }, [currentGameID]);

    /* END On Game Result Click */

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
          </div>
          <div className={"results-container"}>
              { gameLookupData !== undefined && gameLookupData.info !== undefined &&
                  <div>
                      { gameLookupData.deals.map((deal) => (
                          <p>{deal.price}</p>
                      ))

                      }
                  </div>
              }
          </div>
      </div>
    );
}