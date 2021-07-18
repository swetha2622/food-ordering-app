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
    postData:(url,data) => fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
          })
          .then(response=>{
              console.log('test');
              return response.json()
          })
}


export default RestService;