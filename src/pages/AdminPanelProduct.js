import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, memo, useCallback, useState } from 'react'
import { Badge, Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanNewProduct,
  createNewProduct,
  newProductChangeCatValCats,
  newProductChangeCode,
  newProductChangeDescription,
  newProductChangeImg,
  newProductChangeName,
  newProductChangePrice,
  newProductChangeQuantity,
  newProductChangeSubType,
  newProductChangeTycValTyc,
  newProductChangeType,
} from 'src/actions/newProduct'
import { clearProductCategories, getProductCategories } from 'src/actions/productCategories'
import { getProductSubType } from 'src/actions/productSubTypes'
import { getProductType } from 'src/actions/productType'
import {
  clearProductTypeCategories,
  getProductTypeCategories,
} from 'src/actions/productTypeCategories'
import { createHtmlModal } from 'src/helpers/sweeAlertWithHtml'
import { useField } from 'src/hooks/useField'
import { useForm } from 'src/hooks/useForm'
import { getProductValuesCategories } from 'src/services/productCategories'
import { getProductTypeValuesCategories } from 'src/services/productTypeCategories'
import * as yup from 'yup'

const userSchema = yup.object().shape({
  subType: yup.string().required('Seleccione un sub tipo'),
  type: yup.string().required('Seleecione un tipo'),
  description: yup.string().required('El campo descripción es requerido'),
  img: yup.string().required('El campo imágen es requerido'),
  quantity: yup.string().required('El campo cantidad es requerido'),
  price: yup.string().required('El campo precio es requerido'),
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .min(3, 'El campo nombre es muy corto'),
})

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
  const description = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeDescription(description))
  }, [description])

  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>
        <small>Descripción</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...description} />
    </Form.Group>
  )
})
DescriptionForm.displayName = 'DescriptionForm'

const CodeForm = memo(() => {
  const code = useField({ type: 'text' })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(newProductChangeCode(code))
  }, [code])

  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>
        <small>Código</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...code} />
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
  return (
    <>
      <h5>Asignar categorias</h5>
      <hr />
      <Container fluid>
        <Row>
          <TypeCategoriesForm />
          <GlobalCategoriesForm />
        </Row>
      </Container>
    </>
  )
})
CategoriesForm.displayName = 'CategoriesForm'

const TypeCategoriesForm = memo(() => {
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
  }, [values.subTypeCategory])

  useEffect(() => {
    dispatch(newProductChangeTycValTyc(typeCatVal))
  }, [typeCatVal])

  const removeTypCatValItem = (e) => {
    const [typeCatId, subTypeCatValId] = e.target.id.split('-')

    const findIndexItemToRemove = typeCatVal.findIndex(
      (tyCatVal) =>
        tyCatVal.typeCat.id === typeCatId && tyCatVal.subTypeValCat.id === subTypeCatValId
    )
    if (findIndexItemToRemove === -1) return

    const typeCatValArr = typeCatVal
    const newTypeCatValArr = typeCatValArr.splice(findIndexItemToRemove, 1)

    if (newTypeCatValArr.length === 0) return

    setTypeCatVal([...typeCatValArr])
  }

  return (
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
              <option>No se encuentran</option>
            )}
          </Form.Select>
        </Form.Group>
        {typeCategoriesById && typeCategoriesById.length > 0 && (
          <Form.Group className='mb-3'>
            <Form.Select size='sm' name='subTypeCategory' onChange={handleInputChange}>
              {typeCategories && typeCategories.length > 0 ? (
                <>
                  <option value='-1'>Seleccione una opción ({typeCategoriesById.length})</option>
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
      <ListGroup as='ol' numbered>
        {typeCatVal.length === 0 ? (
          <li className='mb-1'>
            <span>
              <small>No hay categorías cargadas</small>
            </span>
          </li>
        ) : (
          typeCatVal.map(({ typeCat, subTypeValCat }) => (
            <ListGroup.Item
              as='li'
              className='d-flex justify-content-between align-items-start'
              key={`typeValCatId-${typeCat.id}`}
            >
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>{typeCat.name}</div>
              </div>
              <Badge bg='primary' pill>
                {subTypeValCat.value}
              </Badge>
              <button
                className='btn btn-close btn-sm'
                id={`${typeCat.id}-${subTypeValCat.id}`}
                onClick={removeTypCatValItem}
                type='button'
              ></button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Col>
  )
})

TypeCategoriesForm.displayName = 'TypeCategoriesForm'

const GlobalCategoriesForm = memo(() => {
  const dispatch = useDispatch()
  const [values, handleInputChange, reset] = useForm({})
  const [categoryById, setCategoryById] = useState([])
  const [catVal, setCatVal] = useState([])
  const { categories, checking } = useSelector((state) => state.rootReducer.productCategories)

  useEffect(() => {
    dispatch(getProductCategories())
  }, [])

  useEffect(() => {
    if (values?.category) {
      getProductValuesCategories(values.category, null, setCategoryById)
    }
  }, [values.category])

  useEffect(() => {
    if (values.category && values.valCategory) {
      setCatVal((prev) => [...prev, { cat: values.category, valCat: values.valCategory }])
    }
    reset()
    dispatch(clearProductCategories())
    dispatch(getProductCategories())
    setCategoryById([])
  }, [values.valCategory])

  useEffect(() => {
    dispatch(newProductChangeCatValCats(catVal))
  }, [catVal])

  const removeCatValItem = (e) => {
    const [catId, valCatId] = e.target.id.split('-')

    const findIndexItemToRemove = catVal.findIndex(
      (catVal) => catVal.cat.id === catId && catVal.valCat.id === valCatId
    )
    if (findIndexItemToRemove === -1) return

    const catValArr = catVal
    const newCatValArr = catValArr.splice(findIndexItemToRemove, 1)

    if (newCatValArr.length === 0) return

    setCatVal([...catValArr])
  }

  return (
    <Col xxl={6}>
      <div className='d-flex align-items-center mb-1'>
        <h6 className='mb-0 pe-1'>
          Categorias <span className='text-danger'>Globales</span>
        </h6>
        <Button variant='primary' className='btn-circle-small'>
          <FontAwesomeIcon icon={faPlus} size='sm' />
        </Button>
      </div>
      <div className='d-flex flex-xl-column justify-content-between pt-2'>
        <Form.Group className='mb-3'>
          <Form.Select size='sm' name='category' onChange={handleInputChange}>
            {checking ? (
              <option>Cargando...</option>
            ) : categories && categories.length > 0 ? (
              <>
                <option value='-1'>Seleccione una opción ({categories.length})</option>
                {categories.map((productCat) => {
                  const hasCategoryBeenSeleted = catVal.some(
                    (typeCatVal) => typeCatVal.cat.id === productCat._id
                  )

                  if (hasCategoryBeenSeleted) return null

                  return (
                    <option
                      value={JSON.stringify({ id: productCat._id, name: productCat.name })}
                      key={`productCatSelect-${productCat._id}`}
                    >
                      {productCat.name}
                    </option>
                  )
                })}
              </>
            ) : (
              <option>No se encuentran</option>
            )}
          </Form.Select>
        </Form.Group>
        {categoryById && categoryById.length > 0 && (
          <Form.Group className='mb-3'>
            <Form.Select size='sm' name='valCategory' onChange={handleInputChange}>
              {categoryById && categoryById.length > 0 ? (
                <>
                  <option value='-1'>Seleccione una opción ({categoryById.length})</option>
                  {categoryById.map((categoriesById) => (
                    <option
                      value={JSON.stringify({
                        id: categoriesById._id,
                        value: categoriesById.value,
                      })}
                      key={`productCatSelect-${categoriesById._id}`}
                    >
                      {categoriesById.value}
                    </option>
                  ))}
                </>
              ) : (
                <option>No se encuentran</option>
              )}
            </Form.Select>
          </Form.Group>
        )}
      </div>
      <h6>Resumen</h6>
      <hr />
      <ListGroup as='ol' numbered>
        {catVal.length === 0 ? (
          <li className='mb-1'>
            <span>
              <small>No hay categorías cargadas</small>
            </span>
          </li>
        ) : (
          catVal.map(({ cat, valCat }) => (
            <ListGroup.Item
              as='li'
              className='d-flex justify-content-between align-items-start'
              key={`valCatId-${cat.id}`}
            >
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>{cat.name}</div>
              </div>
              <Badge bg='primary' pill>
                {valCat.value}
              </Badge>
              <button
                className='btn btn-close btn-sm'
                id={`${cat.id}-${valCat.id}`}
                onClick={removeCatValItem}
                type='button'
              ></button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Col>
  )
})

GlobalCategoriesForm.displayName = 'GlobalCategoriesForm'

const FormContainer = () => {
  const [errors, setErrors] = useState(null)
  const newProduct = useSelector((state) => state.rootReducer.newProduct)
  const dispatch = useDispatch()

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const validData = {
        name: newProduct.name.value,
        price: newProduct.price.value,
        quantity: newProduct.quantity.value,
        product_type_fk: newProduct?.type?.value,
        product_sub_type_fk: newProduct?.subType?.value,
        description: newProduct.description.value,
        img: newProduct.img.value,
      }

      const isValid = await userSchema
        .validate(validData)
        .then(function (data) {
          setErrors(null)
          return true
        })
        .catch(function (err) {
          setErrors(err.errors)
          return false
        })

      if (!isValid) return

      dispatch(createNewProduct(newProduct))
    },
    [newProduct]
  )
  console.log(errors)

  if (newProduct.checking) return <p>Cargando...</p>

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
            {errors && (
              <p className='text-danger'>
                <small>*{errors.map((err) => err)}</small>
              </p>
            )}
          </div>
        </Col>
        <Col>
          <Row>
            <Col xs={12}>
              <div className='bg-white p-3 rounded-3'>
                <TypeSelect />
                {newProduct.type &&
                  newProduct.type?.value !== '' &&
                  newProduct.type?.value !== '-1' && <SubTypeSelect />}
              </div>
            </Col>
            <Col xs={12}>
              {newProduct.type && newProduct.type?.value !== '' && newProduct.type?.value !== '-1' && (
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
