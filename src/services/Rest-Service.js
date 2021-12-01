import React from 'react';

 const RestService = {
    getData: (url)=>  fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response=>response.json())
          .catch(error => {
            console.error('Error:', error);
          }),
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
          .catch(error => {
            console.error('Error:', error);
          })
}


export default RestService;