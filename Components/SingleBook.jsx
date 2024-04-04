import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import CommentList from './CommentList';
import Container from 'react-bootstrap/Container'
import AddComments from './AddComments';
import { useNavigate } from 'react-router-dom';

export default function SingleBook(props) {

  const {id, asin, title, img, selFunc, select , focusFunc} = props;
  // onClick={selFunc}
  const [showForm, setShowForm] = useState(false);
  const HandleShowForm = () => {
  
    setShowForm(!showForm);
    console.log(showForm);
  }

  const navigate = useNavigate()
  const handleDetailsPage = async () => {

    navigate('/BookDetails/'+asin);
  }

  return (
    <>
      <Col md={{ span: 4, offset: 4 }} id={id}  >
      <Card style={{ width: "18rem" }} onClick={() => {{selFunc()};{focusFunc()};}} className={select ? "p-4 ms-4 md-4 card-border selected" : "p-4 ms-4 md-4 card-border"} >        
          <Card.Img variant="404" src={img} height={150} width={150} />
          <Card.Body>
              <Card.Title className="text-warning">{title}</Card.Title>
              <Card.Text>
              {title}                 
              </Card.Text>
              <Button variant="primary" onClick={HandleShowForm}>{showForm === false ? "Quick Review" : "Back"}</Button>
              <Button variant="warning" onClick={handleDetailsPage}>Details</Button>
          </Card.Body>
      </Card>
      </Col>  
      <Col md={{ span: 4, offset: 4 }}>
        {showForm === true &&
          <AddComments
          asin={asin}
          />
        }
      </Col>

        
    </>
 
  );
}
