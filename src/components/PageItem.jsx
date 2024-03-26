import {
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const PageItem = (props) => {
  return (
    <Card size="sm" variant="filled">
      <CardBody>
        <HStack>
          <Heading size="sm">{props.page}</Heading>
          <a target="_blank" href={props.page}>
            <IconButton aria-label="download" icon={<ArrowRightIcon />} />
          </a>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default PageItem;
