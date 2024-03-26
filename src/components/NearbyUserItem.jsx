import { Avatar, AvatarBadge, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const NearbyUserItem = (props) => {
  const [selected, setSelected] = useState(false);

  const toggleUserHandler = () => {
    setSelected((prevState) => !prevState);
    props.onToggleUser(props.user);
  };

  return (
    <VStack onClick={toggleUserHandler} className="hoverable-card" spacing={0}>
      <Avatar name={props.user.name}>
        {selected && <AvatarBadge bg="cyan" boxSize="1em" />}
      </Avatar>

      <Text color="gray" fontSize="xs">
        {props.user.name}
      </Text>
    </VStack>
  );
};

export default NearbyUserItem;
