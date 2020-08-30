import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import { Context as DeviceContext } from "../context/DeviceContext";
import DeviceListItem from "./DeviceListItem";
import DeviceModal from "./DeviceModal";
import ConfirmModal from "./ConfirmModal";
import config from "../config/config";

const DeviceList = () => {
  const {
    state,
    fetchDevices,
    addDevice,
    updateDevice,
    deleteDevice,
  } = useContext(DeviceContext);

  useEffect(() => {
    fetchDevices();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortBy, setSortBy] = useState("system_name");
  const [sortByTitle, setSortByTitle] = useState("System Name");

  const handleCloseAdd = () => setShowAddModal(false);
  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseUpdate = () => setShowUpdateModal(false);
  const handleShowUpdate = () => setShowUpdateModal(true);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleShowDelete = () => setShowDeleteModal(true);

  const onAddDeviceSubmit = async (device) => {
    await addDevice(device);
    handleCloseAdd();
  };

  const onUpdateDeviceSubmit = async (device) => {
    await updateDevice(selectedDevice.id, device);
    handleCloseUpdate();
  };

  const onDelete = async () => {
    await deleteDevice(selectedDevice.id);
    handleCloseDelete();
  };

  const onTypeFilterChange = (typesSelected) => {
    setTypeFilter(typesSelected);
  };

  const handleSortTypeChange = (title, option) => {
    setSortBy(option);
    setSortByTitle(title);
  };

  const renderFilters = () => {
    return (
      <div className="filters-container">
        <div className="filter">
          <span className="label">Device Type</span>
          <DropdownMultiselect
            options={config.deviceTypes}
            name="Device Type"
            handleOnChange={onTypeFilterChange}
          />
        </div>
        <div className="filter">
          <span className="label">Sort By</span>
          <DropdownButton id="dropdown-basic-button" title={sortByTitle}>
            <Dropdown.Item
              onClick={() => handleSortTypeChange("System Name", "system_name")}
            >
              System Name
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortTypeChange("Type", "type")}>
              Type
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                handleSortTypeChange("HDD Capacity", "hdd_capacity")
              }
            >
              HDD Capacity
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    );
  };

  const renderListDevices = () => {
    if (!state) {
      return null;
    }
    let devices = state;
    if (typeFilter.length > 0) {
      devices = state.filter((device) => typeFilter.includes(device.type));
    }
    if (sortBy) {
      devices.sort((aP, bP) => {
        const a = isNaN(Number(aP[sortBy])) ? aP[sortBy] : Number(aP[sortBy]);
        const b = isNaN(Number(bP[sortBy])) ? bP[sortBy] : Number(bP[sortBy]);
        return a > b ? 1 : b > a ? -1 : 0;
      });
    }

    return devices.map((device) => (
      <DeviceListItem
        key={device.id}
        device={device}
        deviceTypes={config.deviceTypes}
        typeIcon={
          device.type && device.type.toLowerCase().includes("windows")
            ? "windows"
            : "apple"
        }
        handleClick={() => {
          setSelectedDevice(device);
          handleShowUpdate();
        }}
        handleDelete={() => {
          setSelectedDevice(device);
          handleShowDelete();
        }}
      />
    ));
  };

  return (
    <div>
      {renderFilters()}
      <Button variant="outline-primary" onClick={handleShowAdd}>
        <FontAwesomeIcon icon="plus" /> Add device
      </Button>
      {renderListDevices()}
      <DeviceModal
        title="Add Device"
        deviceTypes={config.deviceTypes}
        show={showAddModal}
        handleClose={handleCloseAdd}
        onSubmit={onAddDeviceSubmit}
      />
      <DeviceModal
        title="Edit Device"
        deviceTypes={config.deviceTypes}
        show={showUpdateModal}
        handleClose={handleCloseUpdate}
        initValues={selectedDevice}
        onSubmit={onUpdateDeviceSubmit}
      />
      <ConfirmModal
        title="Delete Device"
        show={showDeleteModal}
        handleClose={handleCloseDelete}
        submitButtonText="Delete"
        submitButtonVariant="danger"
        handleSubmit={onDelete}
      >
        <h6>
          Are you sure that you want to delete{" "}
          <b>{selectedDevice && selectedDevice.system_name}</b>?
        </h6>
      </ConfirmModal>
    </div>
  );
};

export default DeviceList;
