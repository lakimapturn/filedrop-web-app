import {
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

const FileItem = (props) => {
  return (
    <Card size="sm" variant="filled">
      <CardBody>
        <HStack>
          <Heading size="sm">{props.file.name}</Heading>
          <a href={props.url} download={props.file.name}>
            <IconButton aria-label="download" icon={<DownloadIcon />} />
          </a>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default FileItem;
