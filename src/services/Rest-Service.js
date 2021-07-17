import React from 'react';

 const RestService = {
    getData: (url)=>  fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response=>response.json()),
        //   .then(data=> data),
    // getData: (url)=> fetch(url).then(response=>response.json()).then(data => data),
    postData:(url,data)=>{
        return fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
          }).then(response=>response.json());
    }
}


export default RestService;