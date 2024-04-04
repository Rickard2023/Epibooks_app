import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Comment(props) {


  const asin = props.asin;
  const guid = props.guid;
  const rate = props.comment.rate;
  console.log(asin);  
  let newRating = 0;
  let newText = '';

  function editPost(newText)
  {
    if(selComm){

      if(newText !== '')
        props.comment.comment = newText;

      if(props.comment.rate !== newRating && newRating > 0 && newRating <= 5)
        props.comment.rate = newRating;
    }  
  }



  function setNewRating(e)
  {
    newRating = e.target.value;
  }

  async function modComment(e, comment,rate)
  {
    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/`;

    let toBeModded = 
    {
      "comment": comment,
      "elementId": asin,
      "rate": rate  
    }

    const rawResponse = await fetch(ENDPOINT + guid , {
      method: "PUT",
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MmMyMjY0NGYxYjAwMTk1MmRmNjYiLCJpYXQiOjE3MTIwNjQyODYsImV4cCI6MTcxMzI3Mzg4Nn0.hH8z3VA8xb-jRgHYlaHokMNaA78h0TkPUP6ziV8Mick",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toBeModded)      
    });
    const content = await rawResponse.json();
    e.target.value = comment;
    console.log(content);
  }

  async function delComment(asin)
  {
    console.log(asin);
    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/`;
    const rawResponse = await fetch(ENDPOINT + guid, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MmMyMjY0NGYxYjAwMTk1MmRmNjYiLCJpYXQiOjE3MTIwNjQyODYsImV4cCI6MTcxMzI3Mzg4Nn0.hH8z3VA8xb-jRgHYlaHokMNaA78h0TkPUP6ziV8Mick",
        'Content-Type': 'application/json'
      },
     
      
    });
    const content = await rawResponse.json();
  }

  const [selComm, setSelComm] = useState(false);
  const handleSelCom = () => {
    setSelComm(!selComm);
  }

  const handlePost = (e, comment, rate) => {
    setSelComm(false);
    modComment(e, comment,rate)
  }

  const [isDeleted, setIsDeleted] = useState(false);
  const handlesetIsDeleted = () => {
    setIsDeleted(!isDeleted);
    if(isDeleted === true)
      setSelComm(false);
  }

  const rateColor = ["black","black","black","green","purple","gold"];

  function getCol()
  {
    return rateColor[rate];
  }

  let modButtonText = selComm ? "Post" : "Modify";
  return (

    <>
    {!isDeleted && 
          <Card style={{ width: "18rem" , marginLeft:"45px"}}>
          <p style={{color: "red" , textAlign: "center",  margin: "15px" , padding: "3px"}}>
            {props.comment.author}
          </p>
          <p style={{color: {getCol},  textAlign: "center", fontSize: "20px"}}>
            {props.comment.rate} stars
          </p>
          <p onClick={handleSelCom}>
            {props.comment.comment}
          </p>
         
          <Button variant="primary" style={{margin: "20px"}} onClick={(e) => {
              
              handleSelCom();
              let text = document.getElementsByTagName('textarea')[0];          
              if(text){
                newText = text.value; 
                console.log("PUT", text.value , newRating);
                handlePost(e, newText, newRating);
                editPost(newText)
              }
              }}>
              {modButtonText}
           </Button>    
            
           {!selComm &&
              <Button variant="danger" style={{margin: "20px"}} onClick={() => {
                delComment(asin);
                handlesetIsDeleted();
                }}>
                Delete        
              </Button>
           }
      
      
            {selComm &&
              <>         
                <textarea>
      
                </textarea>
                <div onChange={setNewRating}>
                    <input type="radio" value="1" name="rating" /> 1
                    <input type="radio" value="2" name="rating" /> 2
                    <input type="radio" value="3" name="rating" /> 3
                    <input type="radio" value="4" name="rating" /> 4
                    <input type="radio" value="5" name="rating" /> 5
                </div>
              </>        
            }
          </Card> 
    }
    </>


 
  )
}
