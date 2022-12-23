import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

function QuotesPage() {
    let [quotes  , setQuotes] = useState(null );

   let {sym} =  useParams();
//    console.log(typeof sym);

    useEffect(()=>{
            var url = `https://prototype.sbulltech.com/api/v2/quotes/${sym}`;

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.setRequestHeader("Accept", "application/json");

            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        let x = xhr.responseText;
                        x = JSON.parse(x);
                        setQuotes(x);
                }
            };

            xhr.send();
    } , [])

  return (
    <div>
        {
            quotes && 
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
                    {
                        quotes.payload[sym].map((quote , i)=>{
                            return(
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{quote.time}</td>
                                    <td>{quote.price}</td>
                                    <td>{quote.valid_till}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        }
    </div>
  )
}

export default QuotesPage