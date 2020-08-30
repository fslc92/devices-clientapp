import React, { Children } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import "./Menu.css";

export default ({ children }) => {
  return (
    <>
      <div className="masthead">
        <Container>
          <h1>
            <FontAwesomeIcon icon="user-ninja" /> Device Manager
          </h1>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  );
};
