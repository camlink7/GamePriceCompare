import React from "react";
import "./HomePage.scss";
import Searchbar from "../../components/Searchbar/Searchbar";

export default function HomePage() {
    return (
      <div className={"d-flex vh-100 w-100 justify-content-center align-items-center text-center"}>
          <div className={"d-inline w-100 h-100"}>
              <div className={"h-25 d-flex justify-content-center align-items-center search-container"}>
                  <Searchbar/>
              </div>
              <div className={"h-75 results-container"}>

              </div>
          </div>

      </div>
    );
}