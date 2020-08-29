import React from "react";
import "./DeviceList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ device, typeIcon, handleClick, handleDelete }) => {
  const { id, system_name, type, hdd_capacity } = device;
  return (
    <div className="card">
      <div className="card-content">
        <div className="title-container">
          <FontAwesomeIcon
            icon={["fab", typeIcon]}
            size="lg"
            className="icon"
          />
          <a className="title" onClick={handleClick}>
            {system_name}
          </a>
        </div>

        <span className="subtitle">{type}</span>
        <span className="description">{hdd_capacity} MB</span>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon
          icon="trash-alt"
          onClick={handleDelete}
          className="icon"
        />
      </div>
    </div>
  );
};
