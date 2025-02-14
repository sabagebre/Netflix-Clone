// import React from 'react'

import { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/request";
import { truncate } from "lodash";
import "./banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fa } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request?.data?.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <div
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original${movie?.backdrop_path}"
      )`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_buttons play">Play</button>
          <button className="banner_buttons myList">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{
                fontSize: "17px",
                marginRight: "10px",
                transform: "rotate(180deg)",
                fontWeight: "700",
              }}
            />
            My List
          </button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
