import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import CommentList from "./CommentList";
import SingleBook from "./SingleBook";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AllTheBooks({ allBooks }) {
  /*  
    Per renderizzare un array devi usare questa sintassi:
    {array.map(el => (PARENTESI TONDE) )}
    e non 
    {array.map(el => {PARENTESI GRAFFE} )}
  */
    const [selAsin, setSelAsin] = useState(null);
    const [selected, setSelected] = useState(null);


    const handleSelected = (asin) => {

      let prev = selected;
      setSelAsin(selected === asin ? null : asin)
      setSelected(selected === asin ? null : asin)
    }

    // questo useState conterrà l'elemento "book" ripreso via onClick in SingleBook attraverso la prop "focusFunc"
    // focusBook viene usato per renderizzare la lista commenti
    const [focusBook, setFocusBook] = useState(null);
    const HandleFocusBook = (book) => {
      setFocusBook(focusBook === book ? null : book)
    }

  return (

    <Row>
      <Col md={8}>
        {allBooks.map((el) => (          
              <SingleBook 
                clicked={false}
                key={el.asin} 
                book={el}
                selFunc={() => handleSelected(el.asin)}
                focusFunc={() => HandleFocusBook(el)}
                select = {selected === el.asin ? true : false}
                img = {el.img}
                asin = {el.asin}
                title = {el.title}
              />              
          ))}
      </Col>
    
     
    </Row>
    
  );
}
