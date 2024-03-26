import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from "../screens/Home";
import NearbyUsers from "../screens/NearbyUsers";
import { Card } from "@chakra-ui/react";
import { useEffect } from "react";
import { createListeners } from "../utils/listeners";
import { useDispatch } from "react-redux";
import ReceiveHistory from "../screens/ReceiveHistory";

const AppNavigator = (props) => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/nearby-users",
      element: <NearbyUsers />,
    },
    {
      path: "/received",
      element: <ReceiveHistory />,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    createListeners(dispatch);
  }, []);

  const router = createMemoryRouter(routes);

  return (
    <Card maxWidth="xs" minWidth="xs">
      <RouterProvider router={router} />
    </Card>
  );
};

export default AppNavigator;
