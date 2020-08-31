import React from "react";
import "./DeviceList.scss";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({
  device,
  deviceTypes,
  typeIcon,
  handleClick,
  handleDelete,
}) => {
  const { system_name, type, hdd_capacity } = device;
  return (
    <div className="card">
      <div className="card-content">
        <div className="title-container">
          {typeIcon && (
            <FontAwesomeIcon
              icon={["fab", typeIcon]}
              size="lg"
              className="icon"
            />
          )}
          <Button className="title" onClick={handleClick} variant="link">
            {system_name}
          </Button>
        </div>

        <span className="subtitle">
          {deviceTypes.find((dt) => dt.key === type).label}
        </span>
        <span className="description">{hdd_capacity} GB</span>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon
          icon="edit"
          onClick={handleClick}
          className="icon"
          color="#067dfe"
        />
        <FontAwesomeIcon
          icon="trash-alt"
          onClick={handleDelete}
          className="icon"
          color="#6d6d6d"
        />
      </div>
    </div>
  );
};
