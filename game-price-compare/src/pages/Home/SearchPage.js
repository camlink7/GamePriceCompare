import React, {useEffect} from "react";
import {useRef, useState} from "react";
import "./SearchPage.scss";
import Searchbar from "../../components/Searchbar/Searchbar";
import {useGetListOfGames} from "../../api/CheapSharkAPI";
import GameResultCard from "../../components/GameResultCard/GameResultCard";

export default function SearchPage() {

    const searchTitleRef = useRef({value: ""});
    const [searchTitle, setSearchTitle] = useState("");

    //Search list of games API req, only enabled if searchTitle is empty
    const {data: searchData, error: searchDataError, status: searchDataStatus,
        isLoading: searchDataIsLoading, isRefetching: searchDataIsRefetching, refetch: refetchSearchData,
        dataUpdatedAt: searchDataUpdatedAt} = useGetListOfGames(searchTitle, !!searchTitle);


    /* On Game Search Change*/
    const onSearchChange = () => {
        setSearchTitle(searchTitleRef.current.value);
    }
    useEffect(() => {
        refetchSearchData().then();
    }, [searchTitle])

    /* END On Game Search Change */

    return (
      <div className={"d-flex vh-100 w-100 justify-content-center align-items-center text-center"}>
          <div className={"d-flex w-100 h-100 justify-content-center align-items-center text-center"}>
              <div className={"d-flex w-100 justify-content-center"}>
                  <div className={"d-inline w-100 h-100 search-container"}>
                      <Searchbar setRef={searchTitleRef} onChange={onSearchChange}/>
                      <div className={"h-75 game-search-container"}>
                          { searchData && !searchDataIsLoading && !searchDataIsRefetching
                              ? <div>
                                  {searchData.map((result) => (
                                      <GameResultCard gameID={result.gameID} thumb={result.thumb} external={result.external}/>
                                  ))}
                              </div>
                              : <div>
                                  <div className="spinner-border" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                  </div>
                              </div>

                          }
                      </div>
                  </div>
              </div>

                <div className={"h-75 results-container"}>

                </div>
          </div>

      </div>
    );
}