import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MDBCol } from "mdbreact";
import { Context } from "../Context/ContextProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./MyNav.css";

export default function MyNav({ handleCheck, setText}) {
  /*

    Ho preso la prop handleCheck direttamente dalla funzione MyNav. 
    Potevamo anche farlo così: const {handleCheck} = props.
    
    Al componente <Form.Check> ho aggiunto un attributo "value" che contiene la categoria specifica,
    ho cambiato da evento onClick, ad evento onChange. Questo evento si portà con se un oggetto event che
    contiene, tra le tante altre cose, due valori che ci interessano: value e checked.
    Value ci dice il valore della casella (fantasy, sci-fi, ecc.), mentre checked ci dice se il box è stato
    "checkato" oppure no.
  */

  return (
    <Navbar expand="lg" bg="dark" variant="light">
      <Container>
        <Navbar.Brand href="#home" className="text-danger">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="text-white">
              About
            </Nav.Link>
            <NavDropdown title="Browse" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <MDBCol md="3" className="navSearch">
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setText(e);
            }}
          />
        </MDBCol>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3 text-light navTicks">
              <Form.Check
                inline
                label="fantasy"
                type={type}
                id={`inline-${type}-0`}
                value="fantasy"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <Form.Check
                inline
                label="history"
                type={type}
                id={`inline-${type}-1`}
                value="history"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <Form.Check
                inline
                //  disabled
                label="horror"
                type={type}
                id={`inline-${type}-2`}
                value="horror"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <Form.Check
                inline
                //  disabled

                label="romance"
                type={type}
                id={`inline-${type}-3`}
                value="romance"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
              <Form.Check
                inline
                //  disabled
                label="sci-fi"
                type={type}
                id={`inline-${type}-4`}
                value="scifi"
                onChange={(e) => {
                  handleCheck(e);
                }}
              />
            </div>
          ))}
        </Form>
      </Container>
    </Navbar>
  );
}
