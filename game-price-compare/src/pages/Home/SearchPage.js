import React from "react";
import {useRef, useState, useEffect} from "react";
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
    useEffect(() => {

    }, [searchData]);

    /* On Game Search Change*/
    const onSearchChange = () => {
        setSearchTitle(searchTitleRef.current.value);
    }
    useEffect(() => {
        refetchSearchData().then();
    }, [searchTitle])

    /* END On Game Search Change */

    return (
      <div className={"d-inline vh-100 w-100 justify-content-center align-items-center text-center"}>
          <div className={"d-inline w-100 search-container justify-content-center align-items-center text-center"}>
              <div className={"d-flex w-100 mt-4 justify-content-center"}>
                  <Searchbar setRef={searchTitleRef} onChange={onSearchChange}
                    hasBoxShadow={searchData && searchData.length === 0}/>
              </div>
              <div className={"d-flex justify-content-center align-items-center"}>
                  {searchData && !searchDataIsLoading && !searchDataIsRefetching
                      ? <div className={`w-50 game-search-container ${searchTitle.trim() === "" && "d-none"}`}>
                          {searchData.length > 0 ? searchData.map((result) => (
                              <GameResultCard result={result}/>
                          ))
                              : <p>No Results Found</p>
                          }
                      </div>
                      : <div className={'w-50 mt-3 game-search-container'}>
                          <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </div>
                      </div>

                  }
              </div>
          </div>
          <div className={"results-container"}>

          </div>
      </div>
    );
}