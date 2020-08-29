import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context as DeviceContext } from "../context/DeviceContext";
import DeviceListItem from "./DeviceListItem";
import DeviceModal from "./DeviceModal";
import ConfirmModal from "./ConfirmModal";

const DeviceList = () => {
  const {
    state: devices,
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

  const listDevices = () => {
    if (!devices) {
      return null;
    }
    return devices.map((device) => (
      <DeviceListItem
        key={device.id}
        device={device}
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
      <Button variant="outline-primary" onClick={handleShowAdd}>
        <FontAwesomeIcon icon="plus" /> Add device
      </Button>
      {listDevices()}
      <DeviceModal
        title="Add Device"
        show={showAddModal}
        handleClose={handleCloseAdd}
        onSubmit={onAddDeviceSubmit}
      />
      <DeviceModal
        title="Update Device"
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
          {selectedDevice && selectedDevice.system_name}?
        </h6>
      </ConfirmModal>
    </div>
  );
};

export default DeviceList;
