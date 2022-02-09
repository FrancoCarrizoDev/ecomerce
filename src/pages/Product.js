import { BootstrapCarousel } from "src/components/BootstrapCarousel"
import { BreadCrum } from "src/components/BreadCrum"
import { CardProduct } from "src/components/CardProduct"
import { CategoriesFilter } from "src/components/CategoriesFilter"
import { Row, Col } from "react-bootstrap"
import useWindowsSize from "../hooks/useWindowsSize"

export const Product = () => {
  const { width } = useWindowsSize()
  return (
    <div className="min-vh-100">
      <div className="container my-4">
        <Row>
          <Col lg="3">
            <BreadCrum />
            <CategoriesFilter width={width} />
          </Col>
          <Col lg="9">
            <BootstrapCarousel height="30vh" />
            <CardProduct width={width} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
