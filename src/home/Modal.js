import React, { Component } from "react";
import {
  Modal,
  Button,
  ModalBody,
  Row,
  Col,
  Form,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import PostCreate from "../posts/PostCreate";

const CreateModal = () => {
  return (
    <div>
      <Button color="danger" onClick={function noRefCheck() {}}>
        Click Me
      </Button>
      <Modal
        centered
        fullscreen="xl"
        scrollable
        size="xl"
        toggle={function noRefCheck() {}}
      >
        <ModalHeader closeButton>Add to the Gallery</ModalHeader>
        <ModalBody>
          <Form>
              Test
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            Do Something
          </Button>{" "}
          <Button variant="danger" onClick={function noRefCheck() {}}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateModal;
