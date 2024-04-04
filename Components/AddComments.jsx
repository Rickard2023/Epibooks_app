import React, { useEffect } from 'react'

export default function AddComments(props) {

  

  let rating = 0;
  function setRating(e)
  {
    rating = e.target.value;
  }


  async function postComment(comment,rate)
  {
    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/`
    let commentData = 
    {
      "comment": comment,
      "rate": rate,
      "elementId": props.asin,

    }

    const rawResponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MmMyMjY0NGYxYjAwMTk1MmRmNjYiLCJpYXQiOjE3MTIwNjQyODYsImV4cCI6MTcxMzI3Mzg4Nn0.hH8z3VA8xb-jRgHYlaHokMNaA78h0TkPUP6ziV8Mick",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
      
    });
    const content = await rawResponse.json();
  
    console.log(commentData);
  }

  return (
    <>
    <textarea style={{ width: "18rem" }}>

    </textarea>
    <div onChange={setRating}>
        <input type="radio" value="1" name="rating" /> 1
        <input type="radio" value="2" name="rating" /> 2
        <input type="radio" value="3" name="rating" /> 3
        <input type="radio" value="4" name="rating" /> 4
        <input type="radio" value="5" name="rating" /> 5
    </div>

    <button onClick={() => {
    
    let text = document.getElementsByTagName('textarea')[0];
    console.log(text);
    if(text){
      let comment = text.value; 
      let rate = rating;
      console.log(text.value);
      postComment(comment,rate)
    }
    }}>
    Post
      
      </button>
    </> 
  )
}
