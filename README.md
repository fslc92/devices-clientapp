# Devices client app

ReactJS app that connects to a REST API to manage Devices.

## Requirements

- [Node.js 12+](https://nodejs.org/en/)
- [Local Server App](https://github.com/NinjaMSP/devicesTask_serverApp)

## Installation

```
npm install
```

## Run App

Make sure to clone the [Local Server App](https://github.com/NinjaMSP/devicesTask_serverApp) and have it up and running.

To start the app:

```
npm start
```

The client app will run at http://localhost:3001/

### Custom Server App URL

You can specify the Server App URL by setting the `REACT_APP_DEVICES_API_URL` environment variable:

```
REACT_APP_DEVICES_API_URL=http://localhost:4000 npm start
```

## Run tests

```
npm run test
```
