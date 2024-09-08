import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function QuotesPage() {
  const [quotes, setQuotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { sym } = useParams();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `https://prototype.sbulltech.com/api/v2/quotes/${sym}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setQuotes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [sym]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {quotes && (
        <table>
          <thead>
            <tr>
              <th>sl</th>
              <th>Time</th>
              <th>Price</th>
              <th>Valid till</th>
            </tr>
          </thead>
          <tbody>
            {quotes.payload[sym]?.map((quote, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{quote.time}</td>
                <td>{quote.price}</td>
                <td>{quote.valid_till}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QuotesPage;
