import { useDispatch } from "react-redux";
import {
  addNearbyUser,
  receiveFile,
  startApplicationSuccess,
  receivePage,
} from "../store/actions/appActions";
import { socket } from "./socketClient";

export const createListeners = (dispatch) => {
  socket.on("start-application-success", ({ nearbyUsers }) => {
    console.log(nearbyUsers);
    dispatch(startApplicationSuccess(nearbyUsers));
  });

  socket.on("receive-file", ({ file }) => {
    console.log(file);
    dispatch(receiveFile(file));
  });

  socket.on("add-user", (nearbyUser) => {
    console.log(nearbyUser);
    dispatch(addNearbyUser(nearbyUser));
  });

  // socket.on("receive-file", ({ file }) => {
  //   dispatch(receiveFile(file));
  // });

  socket.on("receive-page", ({ page }) => {
    dispatch(receivePage(page));
  });
};
