import { Accordion, Form } from "react-bootstrap";

export const CategoriesFilter = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="11">
          <Accordion.Header>TIPO DE PRODUCTO</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header>TALLE</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="XL"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="L"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="M"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>FIT</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>TIRO</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>ESTILO</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>PRECIO</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>COLOR</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>CORTE</Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
