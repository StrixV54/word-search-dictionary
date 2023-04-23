import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";
import google from "googlethis";

const options = {
  page: 0,
  safe: true, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: "en",
  },
};

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);
  let [photos, setPhotos] = useState(null);

  function handleDictionaryResponse(response) {
    // console.log(response);
    // setResults(response.data[0]);
  }

  function handlePexelsResponse(response) {
    // console.log(response.data.photos);
    // setPhotos(response.data.photos);
  }

  function Search(event) {
    event.preventDefault();
    // let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    // console.log(keyword);
    // axios
    //   .get(apiUrl, { headers: { "Content-Type": "" } })
    //   .then(handleDictionaryResponse);
    const fetchData = async () => {
      const response = await google.search("TWDG", options);
      console.log(response);
    };
    fetchData();

    // let pexelsApiKey =
    //   "563492ad6f917000010000016ae5ee198d504fc491478a0fefda2c43";
    // let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    // let headers = { Authorization: `Bearer ${pexelsApiKey}` };
    // axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={Search} className="Search-field">
        <input
          type="search"
          onChange={handleKeywordChange}
          placeholder="Got a word in mind? Look it up!"
        />
      </form>
      <section>
        <Results results={results} />
        <Photos photos={photos} />
      </section>
    </div>
  );
}
