import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, memo, useCallback, useState } from 'react'
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
import {
  clearProductTypeCategories,
  getProductTypeCategories,
} from 'src/actions/productTypeCategories'
import { createHtmlModal } from 'src/helpers/sweeAlertWithHtml'
import { useField } from 'src/hooks/useField'
import { useForm } from 'src/hooks/useForm'
import { getProductTypeValuesCategories } from 'src/services/productTypeCategories'

const NameInput = memo(() => {
  const name = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeName(name))
  }, [name])

  return (
    <Form.Group className='mb-3' controlId='formBasicEmail'>
      <Form.Label>
        <small>Nombre</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...name} />
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
      <Form.Label>
        <small>Precio</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...price} />
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
      <Form.Label>
        <small>Cantidad</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...quantity} />
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
      <Form.Label>
        <small>Imagen</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...img} />
    </Form.Group>
  )
})
ImgForm.displayName = 'ImgForm'

// TODO aca falta el backend para agregar esta property

const DescriptionForm = memo(() => {
  const img = useField({ type: 'text' })

  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>
        <small>Descripción</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...img} />
    </Form.Group>
  )
})
DescriptionForm.displayName = 'DescriptionForm'

const CodeForm = memo(() => {
  const img = useField({ type: 'text' })

  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>
        <small>Código</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...img} />
    </Form.Group>
  )
})
CodeForm.displayName = 'CodeForm'

const TypeSelect = memo(() => {
  const typeProduct = useField({ type: 'text' })
  const dispatch = useDispatch()
  const { productType, checking } = useSelector((state) => state.rootReducer.productType)

  useEffect(() => {
    dispatch(newProductChangeType(typeProduct))
  }, [typeProduct.value])

  return (
    <Form.Group className='mb-3'>
      <Form.Label>
        <small>Tipo de producto</small>
      </Form.Label>
      <Form.Select size='sm' {...typeProduct} name='productSelect'>
        {checking ? (
          <option>Cargando...</option>
        ) : productType && productType.length > 0 ? (
          <>
            <option value='-1'>Seleccione una opción ({productType.length})</option>
            {productType.map((productType) => (
              <option value={productType._id} key={`productTypeSelect-${productType._id}`}>
                {productType.name}
              </option>
            ))}
          </>
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
      <Form.Label>
        <small>Sub tipo de producto</small>
      </Form.Label>
      <Form.Select size='sm' {...subTypeProduct}>
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

const CategoriesForm = memo(() => {
  const dispatch = useDispatch()
  const [values, handleInputChange, reset] = useForm({})
  const [typeCategoriesById, setTypesCategoriesById] = useState([])
  const [typeCatVal, setTypeCatVal] = useState([])
  const { type } = useSelector((state) => state.rootReducer.newProduct)
  const { typeCategories, checking } = useSelector(
    (state) => state.rootReducer.productTypeCategories
  )

  useEffect(() => {
    dispatch(getProductTypeCategories(type.value))
  }, [type])

  useEffect(() => {
    if (values?.typeCategory) {
      getProductTypeValuesCategories(values.typeCategory, null, setTypesCategoriesById)
    }
  }, [values.typeCategory])

  useEffect(() => {
    // TODO aca va la fn que agrega la tupla al arr y quita el type cat del select
    if (values.typeCategory && values.subTypeCategory) {
      setTypeCatVal((prev) => [
        ...prev,
        { typeCat: values.typeCategory, subTypeValCat: values.subTypeCategory },
      ])
    }
    reset()
    dispatch(clearProductTypeCategories())
    dispatch(getProductTypeCategories(type.value))
    setTypesCategoriesById([])
    console.log(typeCatVal)
  }, [values.subTypeCategory])

  return (
    <>
      <h5>Asignar categorias</h5>
      <hr />
      <Container fluid>
        <Row>
          <Col xxl={6}>
            <div className='d-flex align-items-center mb-1'>
              <h6 className='mb-0 pe-1'>
                Categorias por <span className='text-danger'>Tipo</span>
              </h6>
              <Button variant='primary' className='btn-circle-small' onClick={createHtmlModal}>
                <FontAwesomeIcon icon={faPlus} size='sm' />
              </Button>
            </div>
            <div className='d-flex flex-xl-column justify-content-between pt-2'>
              <Form.Group className='mb-3'>
                <Form.Select size='sm' name='typeCategory' onChange={handleInputChange}>
                  {checking ? (
                    <option>Cargando...</option>
                  ) : typeCategories && typeCategories.length > 0 ? (
                    <>
                      <option value='-1'>
                        Seleccione una opción ({typeCategories.length - typeCatVal.length})
                      </option>
                      {typeCategories.map((productType) => {
                        const hasCategoryBeenSeleted = typeCatVal.some(
                          (typeCatVal) => typeCatVal.typeCat.id === productType._id
                        )

                        if (hasCategoryBeenSeleted) return null

                        return (
                          <option
                            value={JSON.stringify({ id: productType._id, name: productType.name })}
                            key={`productTypeSelect-${productType._id}`}
                          >
                            {productType.name}
                          </option>
                        )
                      })}
                    </>
                  ) : (
                    <option>No se encuentran sub tipos</option>
                  )}
                </Form.Select>
              </Form.Group>
              {typeCategoriesById && typeCategoriesById.length > 0 && (
                <Form.Group className='mb-3'>
                  <Form.Select size='sm' name='subTypeCategory' onChange={handleInputChange}>
                    {typeCategories && typeCategories.length > 0 ? (
                      <>
                        <option value='-1'>
                          Seleccione una opción ({typeCategoriesById.length})
                        </option>
                        {typeCategoriesById.map((typeCategoriesById) => (
                          <option
                            value={JSON.stringify({
                              id: typeCategoriesById._id,
                              value: typeCategoriesById.value,
                            })}
                            key={`productTypeSelect-${typeCategoriesById._id}`}
                          >
                            {typeCategoriesById.value}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>No se encuentran sub tipos</option>
                    )}
                  </Form.Select>
                </Form.Group>
              )}
            </div>
            <h6>Resumen</h6>
            <hr />
            <ul>
              {typeCatVal.length === 0 ? (
                <li className='mb-1'>
                  <span>
                    <small>No hay categorías cargadas</small>
                  </span>
                </li>
              ) : (
                typeCatVal.map(({ typeCat, subTypeValCat }) => (
                  <li key={`typeValCatId-${typeCat.id}`} className='mb-1'>
                    <small>
                      {typeCat.name}:{' '}
                      <span style={{ fontWeight: '600' }}>{subTypeValCat.value}</span>
                    </small>
                  </li>
                ))
              )}
            </ul>
          </Col>
          <Col xxl={6}>
            <div className='d-flex align-items-center mb-1'>
              <h6 className='mb-0 pe-1'>
                Categorias <span className='text-danger'>Globales</span>
              </h6>
              <Button variant='primary' className='btn-circle-small'>
                <FontAwesomeIcon icon={faPlus} size='sm' />
              </Button>
            </div>
            <ul>
              <li>
                <span>
                  <small>No hay categorías cargadas</small>
                </span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
})
CategoriesForm.displayName = 'CategoriesForm'

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
            <DescriptionForm />
            <CodeForm />
          </div>
        </Col>
        <Col>
          <Row>
            <Col xs={12}>
              <div className='bg-white p-3 rounded-3'>
                <TypeSelect />
                {newProduct.type &&
                  newProduct?.type?.value !== '' &&
                  newProduct?.type?.value !== '-1' && <SubTypeSelect />}
              </div>
            </Col>
            <Col xs={12}>
              {newProduct.type &&
                newProduct?.type?.value !== '' &&
                newProduct?.type?.value !== '-1' && (
                  <div className='bg-white p-3 rounded-3 mt-3'>
                    <CategoriesForm />
                  </div>
                )}
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Button variant='primary' type='submit' className='mt-3 float-end'>
            Enviar
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
    <Container fluid className='pt-3 '>
      <h4>Crear producto</h4>
      <hr />
      <FormContainer />
    </Container>
  )
}
