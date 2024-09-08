import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Instruments from "./Instrumentslist";

const SearchPage = () => {
  let { searchVal } = useParams();
  let [instruments, setInstruments] = useState(null);

  useEffect(() => {
    const url = "https://prototype.sbulltech.com/api/v2/instruments";

    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.text()) // Fetching as text since it's CSV format
      .then((text) => {
        let rows = text.split("\n");
        let sym = rows.map((val) => val.split(","));
        let data = sym.map((val) => ({
          Symbol: val[0],
          Name: val[1],
          Sector: val[2],
          Validtill: val[3],
        }));
        data.shift();
        data.pop();

        // Filter based on search value
        data = data.filter((inst) => {
          return (
            inst.Symbol.toLowerCase().startsWith(searchVal.toLowerCase()) &&
            inst.Symbol.toLowerCase().includes(searchVal.toLowerCase())
          );
        });
        setInstruments(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchVal]);

  return (
    <div>
      {instruments != null && instruments.length > 0 && (
        <Instruments instruments={instruments} />
      )}
      {instruments && instruments.length === 0 && (
        <h1> NO DATA FOUND , PLEASE TRY FOR DIFFERENT</h1>
      )}
    </div>
  );
};

export default SearchPage;
