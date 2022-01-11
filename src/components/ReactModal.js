import { Modal, Button } from "react-bootstrap";
import { CategoriesFilter } from "./CategoriesFilter";

export const ReactModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Filtros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriesFilter />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
