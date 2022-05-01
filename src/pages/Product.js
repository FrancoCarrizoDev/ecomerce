import { BootstrapCarousel } from 'src/components/BootstrapCarousel'
import { BreadCrum } from 'src/components/BreadCrum'
import { CardProduct } from 'src/components/CardProduct'
import { CategoriesFilter } from 'src/components/CategoriesFilter'
import { Row, Col } from 'react-bootstrap'
import useWindowsSize from '../hooks/useWindowsSize'

export const Product = () => {
  const { width } = useWindowsSize()
  return (
    <div className='min-vh-100'>
      <div className='bgMenuCardProduct py-2'>
        <ul className='container d-flex align-items-center justify-content-between list-style-none mb-0'>
          <li>
            <a href='#id'>Remera</a>
          </li>
          <li>
            <a href='#id'>Calzado</a>
          </li>
          <li>
            <a href='#id'>Camisa</a>
          </li>
          <li>
            <a href='#id'>Pantalon</a>
          </li>
          <li>
            <a href='#id'>Bermuda</a>
          </li>
          <li>
            <a href='#id'>Buzo</a>
          </li>
        </ul>
      </div>
      <div className='container my-3'>
        <Row>
          <Col lg='3'>
            <BreadCrum />
            <CategoriesFilter width={width} />
          </Col>
          <Col lg='9'>
            <BootstrapCarousel height='30vh' />
            <CardProduct width={width} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
