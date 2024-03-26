import { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ChakraProvider } from "@chakra-ui/react";

import AppNavigator from "./navigation/AppNavigator";
import { socket } from "./utils/socketClient";
import appReducer from "./store/reducers/appReducer";

function App() {
  const store = configureStore({
    reducer: appReducer,
  });

  useEffect(() => {
    socket.connect();

    // socket.on("create-room-success", () => {
    //   setSelectedPeople();
    // });

    return () => {
      socket.emit("leave-session");
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <AppNavigator />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
