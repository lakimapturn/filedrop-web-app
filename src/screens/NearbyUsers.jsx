import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import NearbyUserItem from "../components/NearbyUserItem";
import { useEffect, useState } from "react";
import { sharePage, sendFile } from "../store/actions/appActions";
import { Link } from "react-router-dom";

const NearbyUsers = (props) => {
  const nearbyUsers = useSelector((state) => state.nearbyUsers);
  const s = useSelector((state) => state.selectedUsers);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsers(nearbyUsers);
  }, [nearbyUsers]);

  useEffect(() => {
    setSelectedUsers(s);
  }, [s]);

  const onToggleUserHandler = (user) => {
    setSelectedUsers((prevState) => {
      if (prevState.includes(user)) {
        return prevState.filter((u) => u.id !== user.id);
      }
      return [...prevState, user];
    });
  };

  const onSendFileHandler = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      dispatch(sendFile(selectedUsers, files[i]));
    }
  };

  const onSharePageHandler = () => {
    console.log(chrome.tabs);
    const page = chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (tabs) {
        var tabURL = tabs[0].url;
        dispatch(sharePage(selectedUsers, tabURL));
      }
    );
    console.log(page);
  };

  return (
    <>
      <CardHeader textAlign="center">
        <Heading size="md">Filedrop</Heading>
        <Link to="/received">
          <Button variant="link">Received {">"}</Button>
        </Link>

        <Divider />
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={2}>
          {users.map((user) => (
            <NearbyUserItem
              key={user.id}
              user={user}
              onToggleUser={(user) => onToggleUserHandler(user)}
            />
          ))}
        </SimpleGrid>
      </CardBody>
      {selectedUsers.length > 0 && (
        <>
          <Divider marginBottom="1rem" />

          <Input
            onChange={onSendFileHandler}
            multiple
            type="file"
            colorScheme="teal"
            variant="ghost"
          />
          <Button
            onClick={onSharePageHandler}
            colorScheme="teal"
            variant="solid"
          >
            Share Page
          </Button>
        </>
      )}
    </>
  );
};

export default NearbyUsers;
