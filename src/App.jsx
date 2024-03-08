import { useEffect, useState } from "react";
import "./App.css";

import { socket } from "./utils/socketClient";

function App() {
  const [currLocation, setCurrLocation] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    socket.connect();
    navigator.geolocation.getCurrentPosition(sendLocation, (error) => {
      console.log(error);
    });

    return () => {
      socket.emit("leave-session");
      socket.disconnect();
    };
  }, []);

  const sendLocation = (position) => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setCurrLocation({ lat: location.latitude, long: location.longitude });
    socket.emit("enter-name", {
      name: "Laksh Makhija",
      location: location,
    });
  };

  const getNearbyUsers = () => {
    // socket.emit("enter-name", {
    //   name: "Example",
    //   location: { latitude: 23, longitude: -90 },
    // });
    socket.emit("find-nearby-users");
  };

  return (
    <>
      <div>
        <p>
          Hello! Your IP Address is: {currLocation.lat}, {currLocation.long}
        </p>
        <button onClick={getNearbyUsers}>Emit message</button>
      </div>
    </>
  );
}

export default App;
