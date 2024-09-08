import React, { useEffect, useState } from "react";
import Instruments from "./Instrumentslist";

function StocksPage() {
  const [instruments, setInstruments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await fetch(
          "https://prototype.sbulltech.com/api/v2/instruments",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const textData = await response.text();
        const lines = textData.split("\n");

        const data = lines
          .map((line) => {
            const [Symbol, Name, Sector, Validtill] = line.split(",");
            return { Symbol, Name, Sector, Validtill };
          })
          .filter((item) => item.Symbol) // Filters out invalid rows (empty strings)
          .slice(1); // Remove the first row, which is the header

        setInstruments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Instruments instruments={instruments} />
    </div>
  );
}

export default StocksPage;
