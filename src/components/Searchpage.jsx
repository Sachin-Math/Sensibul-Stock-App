import React from 'react'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Instruments from './Instrumentslist';
import QuotesPage from './QuotesPage';

let Searchpage = () => {
    let { searchVal } = useParams();
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
                        data = data.filter((inst)=>{ return (inst.Symbol.startsWith(searchVal)  && inst.Symbol.includes(searchVal))})
                        setInstruments(data);
                }
            };

            xhr.send();
    } , [searchVal])
  
    return (
      <div>

         {instruments != null && instruments.length>0 && <Instruments instruments={instruments}/>}

         {instruments && instruments.length==0 && <h1> NO DATA FOUND , PLEASE TRY FOR DIFFERENT</h1>}


      </div>
    );
  };

export default Searchpage