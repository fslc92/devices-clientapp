export default {
  devicesApiUrl:
    process.env.REACT_APP_DEVICES_API_URL || "http://localhost:3000",
  deviceTypes: [
    { key: "MAC", label: "Mac" },
    { key: "WINDOWS_SERVER", label: "Windows Server" },
    { key: "WINDOWS_WORKSTATION", label: "Windows Workstation" },
  ],
};
