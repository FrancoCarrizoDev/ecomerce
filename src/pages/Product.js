import { BreadCrum } from "components/BreadCrum";
import { CategoriesFilter } from "components/CategoriesFilter";
import { Row, Col } from "react-bootstrap";

export const Product = () => {
  return (
    <div className="container my-4">
      <Row>
        <Col lg="4">
          <BreadCrum />
          <CategoriesFilter />
        </Col>
        <Col lg="8">
          <BreadCrum />
          <CategoriesFilter />
        </Col>
      </Row>
    </div>
  );
};
