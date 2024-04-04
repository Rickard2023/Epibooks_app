import React, { useEffect } from 'react'
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import fantasy from "./fantasy.json";
import history from "./history.json";
import horror from "./horror.json";
import romance from "./romance.json";
import scifi from "./scifi.json";
import CommentList from "./CommentList";
import AddComments from './AddComments';

import { FaEdit } from "react-icons/fa";

export default function BookDetails() {

  const {asin} = useParams();
  console.log(asin);

  const array = [
    ...fantasy,
    ...history,
    ...horror,
    ...romance,
    ...scifi,
  ]
  let book = null;
  for(let el of array)
  {
    if(el.asin === asin){
       book = el;
       break;
    }
  }

  console.log(book);
  let img = book.img;
  let title = book.title;
  console.log(asin);



  const [postMenu, setPostMenu] = useState(false);
  const handlePostMenu = () => {
    setPostMenu(!postMenu);
    console.log(postMenu);
  }

  return (
    <div>
        <Card style={{ width: "25rem" }} className="p-4 ms-4 md-4 card-border">        
          <Card.Img variant="404" src={img} height={350} width={350} />
          <Card.Body>
              <Card.Title className="text-warning">{title}</Card.Title>
              <Card.Text>
              {asin}                 
              </Card.Text>
              {!postMenu && <Button style={{margin: "10px"}} variant="primary" onClick={handlePostMenu}>Post Comment</Button> }
              {postMenu && <Button style={{margin: "10px"}} variant="warning" onClick={handlePostMenu}>Back</Button> }
          </Card.Body>
          <Col md={{ span: 0, offset: 1 }}>
          {postMenu &&
            <AddComments
            asin={book.asin}
            onClick={handlePostMenu}
            />
          }   
          </Col>
        </Card>
      
        <Col>
          {book !== null && 
            <CommentList
              title = {book.title}
              asin = {book.asin}
              id = {book.id}
            />
          }
        </Col>
   
     
    </div>
  )
}
