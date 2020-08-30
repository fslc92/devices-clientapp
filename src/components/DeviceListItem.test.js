import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faTrash,
  faTrashAlt,
  faPlus,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faTrashAlt, faTrash, faPlus, faEdit);

import DeviceListItem from "./DeviceListItem";

const deviceTypes = [
  { key: "MAC", label: "Mac" },
  { key: "WINDOWS_SERVER", label: "Windows Server" },
  { key: "WINDOWS_WORKSTATION", label: "Windows Workstation" },
];

test("should render device item info", () => {
  const device = {
    system_name: "My PC",
    type: "WINDOWS_WORKSTATION",
    hdd_capacity: "200",
  };

  const { getByText } = render(
    <DeviceListItem device={device} deviceTypes={deviceTypes} />
  );

  const deviceNameElement = getByText(/My PC/i);
  const deviceTypeElement = getByText(/Windows Workstation/i);
  const deviceCapacityElement = getByText(/200 GB/i);
  expect(deviceNameElement).toBeInTheDocument();
  expect(deviceTypeElement).toBeInTheDocument();
  expect(deviceCapacityElement).toBeInTheDocument();
});

test("should call onClick when clicked on device name", () => {
  const device = {
    system_name: "My PC",
    type: "WINDOWS_WORKSTATION",
    hdd_capacity: "200",
  };
  const openEditModalFn = jest.fn(() => {});
  const { getByText } = render(
    <DeviceListItem
      device={device}
      deviceTypes={deviceTypes}
      handleClick={openEditModalFn}
    />
  );
  const deviceNameElement = getByText(/My PC/i);
  fireEvent(
    deviceNameElement,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(openEditModalFn).toHaveBeenCalledTimes(1);
});
