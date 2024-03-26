import {
  ADD_NEARBY_USER,
  ADD_USER,
  CREATE_CONNECTION,
  DESELECT_USER,
  FETCHING,
  RECEIVE_FILE,
  RECEIVE_PAGE,
  SELECT_USER,
  SET_NEARBY_USERS,
} from "../actions/appActions";

const initialState = {
  name: "",
  isFetching: "",
  currentLocation: { lat: 0, long: 0 },
  selectedUsers: [],
  nearbyUsers: [],
  receivedFiles: [],
  receivedPages: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case ADD_USER: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        name: action.payload.name,
        currentLocation: action.payload.location,
      });
    }

    case SET_NEARBY_USERS: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        nearbyUsers: action.payload.users,
      });
    }

    case ADD_NEARBY_USER: {
      if (
        state.nearbyUsers.findIndex(
          (user) => user.id === action.payload.nearbyUser.id
        ) !== -1
      ) {
        return state;
      }
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        nearbyUsers: [...state.nearbyUsers, action.payload.nearbyUser],
      });
    }

    case SELECT_USER: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        selectedUsers: [...state.selectedUsers, action.payload.user],
      });
    }

    case DESELECT_USER: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        selectedUsers: state.selectedUsers.filter(
          (user) => user.id === action.payload.userId
        ),
      });
    }

    case RECEIVE_FILE: {
      console.log(action.payload.file);
      if (
        state.receivedFiles.findIndex(
          (file) => file.name === action.payload.file.name
        ) !== -1
      ) {
        return state;
      }
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        receivedFiles: [...state.receivedFiles, action.payload.file],
      });
    }

    case RECEIVE_PAGE: {
      if (
        state.receivedPages.findIndex(
          (page) => page === action.payload.page
        ) !== -1
      ) {
        return state;
      }
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        receivedPages: [...state.receivedPages, action.payload.page],
      });
    }

    default: {
      return state;
    }
  }
};

export default appReducer;
