import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import NavBar from "../components/NavBar";
import data from "../src/frontendDevFakeData/fakeData";
import HitCard from "../components/HitCard";
import NoHits from "../components/NoHits";

const foundInArray = (el, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (el.TITLE == arr[i].TITLE) return true;
  }
  return false;
};
const getAllElements = async () => {
  let url = window.location.origin + "/api/GETRetrieveCollection?";
  const manyElements = await fetch(url, { method: "GET" }).then((response) =>
    response.json()
  );
  return manyElements;
};
/**
 * @func getSearchResults
 * @param {string} searchStr denotes the string value to search the database for.
 * @executes a get request to the NEXTJS backend that returns the search results obtained by the MongoAPI 
 * @returns a JSON formatted array of elements w/ terms matching the search query. Includes some information about the term, like TITLE and DESCRIPTION.
 */
const getSearchResults = async (searchStr) => {
  try {
    let searchableStr = searchStr.replace(/\s/g, "+");
    let url =
      window.location.origin + "/api/GETSearchOptimized?searchTerm=" +
      searchableStr;

    let searchResultData = await fetch(url, { method: "GET" }).then(
      (response) => response.json()
    );
    return searchResultData;
  } catch (err) {
    console.log(err);
  }
};

export default function Home() {
  const [options, setOptions] = useState([]);
  const [allElements, setAllElements] = useState([]);
  const [search, setSearch] = useState("");
  let count = 0;
  //GET Request for the backend to use the MongoDBAPI to look up the db for the word in the textfield (e.target.value : string)
  const onNewSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      let data = await getSearchResults(e.target.value);
      setOptions(data);
    }
  };
  //GET Request for the backend w/ a promise (async) that returns a list of all the elements in the database :) Good for populating the page when no search has been executed
  const populateAllElements = async () => {
    let data = await getAllElements();
    console.log(data);
    setAllElements(data);
  };

  useEffect(() => {
    //When component finished mounting, make the call to obtain all of the elements in the DB, which results in a component reload w/ all the elements rendered.
    populateAllElements();
  }, []);
  return (
    <div className="w-full">
      <Head>
        <title>GET APP PWA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-auto flex-col items-center justify-center">
        <NavBar></NavBar>
        <div className="w-4/5 mt-2">
          <TextField
            className="w-full"
            label="GETSearch"
            value={search}
            //When the input in the field is changed, run the search function.
            onChange={(e) => {
              onNewSearch(e);
            }}
          />
        </div>
        <div className="w-4/5 py-5"> {/**Maps @var options to a HitCard element. If options is empty, that means no elements satisfy the query/search, so the NoHits element is rendered instead */}
          {options && options.length > 0 ? (
            options.map((hit) => {
              count++;
              return <HitCard key={count} termData={hit}></HitCard>;
            })
          ) : options && options.length == 0 && search != "" ? (
            <NoHits></NoHits>
          ) : (
            []
          )}
          <div className=" bg-gray-400 text-white flex justify-center items-center px-2 py-3 w-full h-10 mb-4 rounded-lg overflow-y-hidden">
            <h1 className="font-light text-md">Additional Results</h1>
          </div>
          {/**Maps @var allElements to a HitCard, but does not render those that have already been included by the @var options in the previous lines */}
          {allElements
            ? allElements.map((el) => {
                if (!foundInArray(el, options)) {
                  count++;
                  if (count > 50) return;
                  return <HitCard key={count} termData={el}></HitCard>;
                }
              })
            : []}
        </div>
      </main>
    </div>
  );
}