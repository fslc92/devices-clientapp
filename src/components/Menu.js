import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import "./Menu.scss";

export default ({ children }) => {
  return (
    <>
      <div className="masthead">
        <Container>
          <h3>
            <FontAwesomeIcon icon="user-ninja" className="logo" /> Device
            Manager
          </h3>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  );
};
