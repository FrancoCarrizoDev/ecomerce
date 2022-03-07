import { useEffect, memo, useCallback } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanNewProduct,
  newProductChangeImg,
  newProductChangeName,
  newProductChangePrice,
  newProductChangeQuantity,
  newProductChangeSubType,
  newProductChangeType,
} from 'src/actions/newProduct'
import { getProductSubType } from 'src/actions/productSubTypes'
import { getProductType } from 'src/actions/productType'
import { useField } from 'src/hooks/useField'

const NameInput = memo(() => {
  const name = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeName(name))
  }, [name])

  return (
    <Form.Group className='mb-3' controlId='formBasicEmail'>
      <Form.Label>Nombre</Form.Label>
      <Form.Control type='text' {...name} />
      {/* <Form.Text className='text-muted'>
        Este nombre será el visualizado a la vista del usuario.
      </Form.Text> */}
    </Form.Group>
  )
})
NameInput.displayName = 'NameInput'

const PriceInput = memo(() => {
  const price = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangePrice(price))
  }, [price])
  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>Precio</Form.Label>
      <Form.Control type='text' {...price} />
    </Form.Group>
  )
})
PriceInput.displayName = 'PriceInput'

const QuantityForm = memo(() => {
  const quantity = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeQuantity(quantity))
  }, [quantity])
  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>Cantidad</Form.Label>
      <Form.Control type='text' {...quantity} />
    </Form.Group>
  )
})
QuantityForm.displayName = 'QuantityForm'

const ImgForm = memo(() => {
  const img = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeImg(img))
  }, [img])
  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>Imagen</Form.Label>
      <Form.Control type='text' {...img} />
    </Form.Group>
  )
})
ImgForm.displayName = 'ImgForm'

const TypeSelect = memo(() => {
  const typeProduct = useField({ type: 'text' })
  const dispatch = useDispatch()
  const { productType, checking } = useSelector((state) => state.rootReducer.productType)

  useEffect(() => {
    dispatch(newProductChangeType(typeProduct))
  }, [typeProduct.value])

  return (
    <Form.Group className='mb-3'>
      <Form.Label>Tipo de producto</Form.Label>
      <Form.Select {...typeProduct} name='productSelect'>
        {checking ? (
          <option>Cargando...</option>
        ) : productType && productType.length > 0 ? (
          productType.map((productType) => (
            <option value={productType._id} key={`productTypeSelect-${productType._id}`}>
              {productType.name}
            </option>
          ))
        ) : (
          <option>No se encuentran tipos</option>
        )}
      </Form.Select>
    </Form.Group>
  )
})

TypeSelect.displayName = 'TypeSelect'

const SubTypeSelect = memo(() => {
  const subTypeProduct = useField({ type: 'text' })
  const dispatch = useDispatch()
  const { type } = useSelector((state) => state.rootReducer.newProduct)
  const { productSubTypes, checking } = useSelector((state) => state.rootReducer.productSubTypes)

  useEffect(() => {
    dispatch(newProductChangeSubType(subTypeProduct))
  }, [subTypeProduct.value])

  useEffect(() => {
    if (+type.value !== -1) {
      dispatch(getProductSubType(type.value))
    }
  }, [type])

  return (
    <Form.Group className='mb-3'>
      <Form.Label>Sub tipo de producto</Form.Label>
      <Form.Select {...subTypeProduct}>
        {checking ? (
          <option>Cargando...</option>
        ) : productSubTypes && productSubTypes.length > 0 ? (
          <>
            <option value='-1'>Seleccione una opción ({productSubTypes.length})</option>
            {productSubTypes.map((productType) => (
              <option value={productType._id} key={`productTypeSelect-${productType._id}`}>
                {productType.name}
              </option>
            ))}
          </>
        ) : (
          <option>No se encuentran sub tipos</option>
        )}
      </Form.Select>
    </Form.Group>
  )
})

SubTypeSelect.displayName = 'SubTypeSelect'

const FormContainer = () => {
  const newProduct = useSelector((state) => state.rootReducer.newProduct)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      console.log(newProduct)
    },
    [newProduct]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <div className='bg-white p-3 rounded-3'>
            <NameInput />
            <PriceInput />
            <QuantityForm />
            <ImgForm />
          </div>
        </Col>
        <Col>
          <div className='bg-white p-3 rounded-3'>
            <TypeSelect />
            {newProduct.type && newProduct?.type?.value !== '' && <SubTypeSelect />}
            <TypeSelect />
            {newProduct.type && newProduct?.type?.value !== '' && <SubTypeSelect />}
          </div>
        </Col>
        <Col xs={12}>
          <Button variant='primary' type='submit' className='mt-3 float-end'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export const AdminPanelProduct = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductType())
    return () => {
      dispatch(cleanNewProduct())
    }
  }, [])

  return (
    <Container className='pt-3 '>
      <h4>Crear producto</h4>
      <hr />
      <FormContainer />
    </Container>
  )
}
