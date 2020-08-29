import React, { Children } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./DeviceManager.css";

export default ({ children }) => {
  return (
    <>
      <Jumbotron className="masthead">
        <h1>Ninja RMM Device Manager</h1>
      </Jumbotron>
      <Container>{children}</Container>
    </>
  );
};
