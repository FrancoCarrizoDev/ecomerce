import { BootstrapCarousel } from "components/BootstrapCarousel";
import { BreadCrum } from "components/BreadCrum";
import { CardProduct } from "components/CardProduct";
import { CategoriesFilter } from "components/CategoriesFilter";
import { Row, Col } from "react-bootstrap";

export const Product = () => {
  return (
    <div className="container my-4">
      <Row>
        <Col lg="3">
          <BreadCrum />
          <CategoriesFilter />
        </Col>
        <Col lg="9">
          <BootstrapCarousel height="30vh" />
          <CardProduct />
        </Col>
      </Row>
    </div>
  );
};
