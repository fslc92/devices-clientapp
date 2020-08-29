import createDataContext from "./createDataContext";
import api from "../api/apiDevices";

const deviceReducer = (state, action) => {
  switch (action.type) {
    case "fetch_devices":
      return action.payload;
    case "add_device":
      return [...state, action.payload];
    case "update_device":
      return state.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    case "delete_device":
      return state.filter((el) => el.id !== action.payload.id);
    default:
      return state;
  }
};

const fetchDevices = (dispatch) => async () => {
  const response = await api.get("/devices");
  dispatch({ type: "fetch_devices", payload: response.data });
};

const addDevice = (dispatch) => async (device) => {
  const response = await api.post("/devices", {
    system_name: device.systemName,
    type: device.type,
    hdd_capacity: device.capacity,
  });
  dispatch({ type: "add_device", payload: response.data });
};

const updateDevice = (dispatch) => async (id, device) => {
  const data = {
    system_name: device.systemName,
    type: device.type,
    hdd_capacity: device.capacity,
  };
  await api.put(`/devices/${id}`, data);
  dispatch({ type: "update_device", payload: { id, ...data } });
};

const deleteDevice = (dispatch) => async (id) => {
  await api.delete(`/devices/${id}`);
  dispatch({ type: "delete_device", payload: { id } });
};

export const { Provider, Context } = createDataContext(
  deviceReducer,
  { fetchDevices, addDevice, updateDevice, deleteDevice },
  [] // initial list of devices
);
