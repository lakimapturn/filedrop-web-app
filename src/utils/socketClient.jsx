import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL = "https://filedrop-server.onrender.com/";
const URL = "http://localhost:4000";

export const socket = io(URL, { transports: ["websocket"] });
