import {
  Button,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startApplication } from "../store/actions/appActions";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const dispatch = useDispatch();

  const onTextChangeHandler = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onPositionChangeHandler,
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const onPositionChangeHandler = (pos) => {
    setLocation({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  };

  const onStartApplicationHandler = () => {
    dispatch(startApplication(name, location));
  };

  return (
    <>
      <CardHeader textAlign="center">
        <Heading size="md">Filedrop</Heading>
        <Divider />
      </CardHeader>
      <CardBody>
        <VStack>
          <FormControl>
            <FormLabel>Enter Name</FormLabel>
            <Input
              onChange={onTextChangeHandler}
              maxWidth="10rem"
              type="text"
            />
            <FormHelperText>
              This is the name you will be discoverable as!
            </FormHelperText>
            <Link to="/nearby-users">
              <Button
                onClick={onStartApplicationHandler}
                mt={4}
                colorScheme="teal"
                type="submit"
              >
                Find Users!
              </Button>
            </Link>
          </FormControl>
        </VStack>
      </CardBody>
    </>
  );
};

export default Home;
