import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import DeviceList from "./components/DeviceList";
import { Provider as DeviceProvider } from "./context/DeviceContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faTrash,
  faTrashAlt,
  faPlus,
  faEdit,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faTrashAlt, faTrash, faPlus, faEdit, faUserNinja);

function App() {
  return (
    <DeviceProvider>
      <Menu>
        <DeviceList />
      </Menu>
    </DeviceProvider>
  );
}

export default App;
