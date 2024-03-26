import {
  CardBody,
  Divider,
  HStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FileItem from "../components/FileItem";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import PageItem from "../components/PageItem";

const ReceiveHistory = (props) => {
  const pages = useSelector((state) => state.receivedPages);
  const files = useSelector((state) => state.receivedFiles);

  const Files = () => {
    return files.map((f) => {
      const file = new File([f.body], f.name, { type: f.type });
      console.log(file);
      const url = URL.createObjectURL(file);

      return <FileItem key={f.name} file={file} url={url} />;
    });
  };

  const Pages = () => {
    return pages.map((p) => {
      return <PageItem page={p} key={p} />;
    });
  };

  return (
    <>
      <CardBody>
        <HStack>
          <Link to="/nearby-users">
            <IconButton variant="link" leftIcon={<ArrowBackIcon />} />
          </Link>

          <Heading textAlign="center" size="md">
            Received Files
          </Heading>
        </HStack>

        <Files />
        <Divider />
        <Pages />
      </CardBody>
    </>
  );
};

export default ReceiveHistory;
