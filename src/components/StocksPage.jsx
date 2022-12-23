import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Instruments from './Instrumentslist';

function StocksPage() {

    let [instruments  , setInstruments] = useState(null );

    useEffect(()=>{
            var url = "https://prototype.sbulltech.com/api/v2/instruments";

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.setRequestHeader("Accept", "application/json");

            xhr.onreadystatechange = function () 
            {
                if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        let x = xhr.responseText;

                        x = x.split("\n");
                        let sym = x.map( (val)=>{ return val.split(",")  })
                        let data = sym.map( (val)=>{ return {Symbol:val[0] , Name:val[1] , Sector : val[2] , Validtill : val[3]} } );
                        data.shift();
                        data.pop();
                        setInstruments(data);

                }
            };

            xhr.send();
    } , [])


  return (
  <div>
    <Instruments instruments={instruments}/>
  </div>
  )
}

export default StocksPage
