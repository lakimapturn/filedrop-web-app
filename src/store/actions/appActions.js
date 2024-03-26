import { socket } from "../../utils/socketClient";

export const FETCHING = "FETCHING";
export const ADD_USER = "ADD_USER";
export const ADD_NEARBY_USER = "ADD_NEARBY_USER";
export const FIND_USERS = "FIND USERS";
export const SELECT_USER = "SELECT_USER";
export const DESELECT_USER = "DESELECT_USER";
export const SET_NEARBY_USERS = "SET_NEARBY_USERS";
export const CREATE_CONNECTION = "CREATE_CONNECTION";
export const RECEIVE_FILE = "RECEIVE_FILE";
export const RECEIVE_PAGE = "RECEIVE_PAGE";
export const LEAVE = "LEAVE";

export const addName = (name, position) => {
  return (dispatch) => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    socket.emit("enter-name", {
      name: "Laksh Makhija",
      location: location,
    });
    dispatch({ type: ADD_USER, payload: { name: name, location: location } });
  };
};

export const startApplication = (name, position) => {
  return (dispatch) => {
    console.log("startApplication", name, position);
    socket.emit("start-application", {
      name: name,
      location: position,
    });
    dispatch({ type: ADD_USER, payload: { name: name, location: position } });
  };
};

export const startApplicationSuccess = (users) => {
  return (dispatch) => {
    dispatch({ type: SET_NEARBY_USERS, payload: { users: users } });
  };
};

export const selectUser = (user) => {
  return (dispatch) => {
    socket.emit("create-room", { receiver: user });
    dispatch({ type: SELECT_USER, payload: { user: user } });
  };
};

export const deselectUser = (userId) => {
  return (dispatch) => {
    socket.emit("close-room", {
      userId: userId,
    });
    dispatch({ type: DESELECT_USER, payload: { userId: userId } });
  };
};

export const sendFile = (selectedUsers, file) => {
  return (dispatch) => {
    console.log(file);
    socket.emit("send-file", {
      selectedUsers: selectedUsers,
      file: { name: file.name, body: file, type: file.type },
    });
  };
};

export const receiveFile = (file) => {
  return (dispatch) => {
    dispatch({ type: RECEIVE_FILE, payload: { file: file } });
  };
};

export const addNearbyUser = (nearbyUser) => {
  return (dispatch) => {
    dispatch({ type: ADD_NEARBY_USER, payload: { nearbyUser: nearbyUser } });
  };
};

export const sharePage = (selectedUsers, page) => {
  return (dispatch) => {
    socket.emit("share-page", { selectedUsers: selectedUsers, page: page });
  };
};

export const receivePage = (page) => {
  return (dispatch) => {
    dispatch({ type: RECEIVE_PAGE, payload: { page: page } });
  };
};

// export const closeApplication = () => {
//   return (dispatch) => {
//     dispatch({ type: SELECT_USER, payload: { user: user } });
//   };
// };
