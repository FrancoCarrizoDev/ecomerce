import { Card, Form } from 'react-bootstrap'
import { ImageAndHoverImage } from 'src/helpers/ImageAndHoverImage'
import { useState, useEffect } from 'react'
import { getProducts } from 'src/services/product'

export const CardProduct = ({ width }) => {
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({ genere: 'man' })
      setProducts(products)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className=' mt-3 '>
      <div className='d-flex justify-content-between '>
        <div className='flex-grow-1 pe-3'>
          <h5>HOMBRE</h5>
          <hr />
        </div>
        {width >= 768 && (
          <div className='d-flex align-items-center'>
            <span className='me-2'>Ordenar</span>
            <Form.Select size='sm' aria-label='Default select example'>
              <option>Más relevantes</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
          </div>
        )}
      </div>
      <div className='gridCards '>
        {loading ? (
          <p>Cargando...</p>
        ) : products?.length > 0 ? (
          products.map((product) => (
            <div className='mb-3 h-100' key={`card-product-${product._id}`}>
              <Card className='border-0 shadow-sm h-100'>
                <ImageAndHoverImage
                  background={product.img[0].secure_url}
                  hoverBackground={product.img[1].secure_url}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <p className='card-text'>
                    <del className='me-3 text-muted'>${product.price}</del>
                    <span>${product.price - 1000}</span>
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No hay productos</p>
        )}
      </div>
    </div>
  )
}
