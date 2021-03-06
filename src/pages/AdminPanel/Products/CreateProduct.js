import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, memo, useCallback, useState } from 'react'
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanNewProduct,
  createNewProduct,
  newProductChangeCatValCats,
  newProductChangeCode,
  newProductChangeDescription,
  newProductChangeGender,
  newProductChangeImg,
  newProductChangeName,
  newProductChangePrice,
  newProductChangeQuantity,
  newProductChangeSubType,
  newProductChangeTycValTyc,
  newProductChangeType,
  newProductFinishUploadImgAction,
  newProductStartUploadImgAction,
} from 'src/actions/newProduct'
import { clearProductCategories, getProductCategories } from 'src/actions/productCategories'
import { getProductSubType } from 'src/actions/productSubTypes'
import { getProductType } from 'src/actions/productType'
import {
  clearProductTypeCategories,
  getProductTypeCategories,
} from 'src/actions/productTypeCategories'
import { createModal } from 'src/helpers/sweetAlert'
import { useField } from 'src/hooks/useField'
import { useForm } from 'src/hooks/useForm'
import { getGenders } from 'src/services/product'
// import { useMultipleImgField } from 'src/hooks/useMultipleImgField'
import {
  createProductsValueCategory,
  getProductValuesCategories,
} from 'src/services/productCategories'
import { createProductSubType } from 'src/services/productSubTypes'
import { createProductType } from 'src/services/productType'
import {
  createProductsTypeValueCategory,
  createProductTypeCategory,
  getProductTypeValuesCategories,
} from 'src/services/productTypeCategories'
import { fetchUploadImage } from 'src/services/upload'
import { MODAL_TYPES } from 'src/types/modalTypes'
import * as yup from 'yup'

const userSchema = yup.object().shape({
  product_sub_type_fk: yup.string().required('Seleccione un sub tipo'),
  product_type_fk: yup.string().required('Seleecione un tipo'),
  description: yup.string().required('El campo descripci??n es requerido'),
  gender: yup.string().required('Seleccione un g??nero por favor'),
  img: yup.array().required('El campo im??gen es requerido'),
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
        Este nombre ser?? el visualizado a la vista del usuario.
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
    <FormGroup className='mb-3'>
      <Form.Label>
        <small>Precio</small>
      </Form.Label>
      <InputGroup size='sm'>
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl aria-label='Precio' type='text' {...price} />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
    </FormGroup>
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
  const dispatch = useDispatch()
  const [files, setFiles] = useState([])
  const { img, uploadingImg } = useSelector((state) => state.rootReducer.newProduct)

  const onFileChange = (event) => {
    setFiles(event.target.files)
  }

  useEffect(() => {
    if (files.length > 0) {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('collection', files[i])
      }

      const ejectFetchUploadImage = async () => {
        dispatch(newProductStartUploadImgAction())
        const resp = await fetchUploadImage(formData)
        dispatch(newProductChangeImg(resp))
        dispatch(newProductFinishUploadImgAction())
      }
      ejectFetchUploadImage()
    }
  }, [files])

  const handleClickViewImg = (e) => {
    const imgId = e.target.id ? e.target.id.split('-')[1] : e.target.parentNode.id.split('-')[1]
    const captureImg = img.find((img) => img.asset_id === imgId)
    createModal(MODAL_TYPES.imgViewer, captureImg.secure_url, 'Im??genes')
  }

  return (
    <>
      <Form.Group className='mb-3'>
        <Form.Label>
          <small>Imagen</small>
        </Form.Label>
        <Form.Control
          size='sm'
          type='file'
          multiple
          onChange={onFileChange}
          id='multipleImgFilesInput'
        />
      </Form.Group>
      <div className='d-flex '>
        {uploadingImg ? (
          <p>Cargando...</p>
        ) : (
          img?.length > 0 &&
          img.map((img) => (
            <div
              key={`img-${img.asset_id}`}
              className='smallImgToUpload img-thumbnail mx-1 mb-3'
              style={{ backgroundImage: `url(${img.secure_url})` }}
            >
              <Button
                id={`btnView-${img.asset_id}`}
                variant='warning'
                size='sm'
                className='float-end pointer'
                onClick={handleClickViewImg}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  size={'sm'}
                  id={`svgView-${img.asset_id}`}
                  onClick={handleClickViewImg}
                />
              </Button>
            </div>
          ))
        )}
      </div>
    </>
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
      {/* <Form.Label>
        <small>Descripci??n</small>
      </Form.Label> */}
      <InputGroup size='sm'>
        <InputGroup.Text>Descripci??n</InputGroup.Text>
        <FormControl as='textarea' aria-label='With textarea' type='textarea' {...description} />
      </InputGroup>
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
        <small>C??digo</small>
      </Form.Label>
      <Form.Control size='sm' type='text' {...code} />
    </Form.Group>
  )
})
CodeForm.displayName = 'CodeForm'

const GendersForm = memo(() => {
  const gender = useField({ type: 'text' })
  const [checking, setChecking] = useState(false)
  const [genders, setGenders] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchGetGenders = async () => {
      setChecking(true)
      const { genders } = await getGenders()
      setGenders(genders)
      setChecking(false)
    }
    fetchGetGenders()
  }, [])

  useEffect(() => {
    dispatch(newProductChangeGender(gender))
  }, [gender])

  return (
    <Form.Group className='mb-3' controlId='formBasicPassword'>
      <Form.Label>
        <small>G??nero</small>
      </Form.Label>
      <Form.Select size='sm' name='gender' {...gender}>
        {checking ? (
          <option>Cargando...</option>
        ) : genders && genders.length > 0 ? (
          <>
            <option value='-1'>Seleccione una opci??n ({genders.length})</option>
            {genders.map((gender) => (
              <option value={gender._id} key={`gender-${gender._id}`}>
                {gender.name}
              </option>
            ))}
          </>
        ) : (
          <option>No se encuentran g??neros</option>
        )}
      </Form.Select>
    </Form.Group>
  )
})
GendersForm.displayName = 'CodeForm'

const TypeSelect = memo(() => {
  const typeProduct = useField({ type: 'text' })
  const dispatch = useDispatch()
  const { productType, checking } = useSelector((state) => state.rootReducer.productType)

  useEffect(() => {
    dispatch(newProductChangeType(typeProduct))
  }, [typeProduct.value])

  const handleClickAdd = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un nuevo tipo',
      successMessage: 'Tipo agregado!',
      service: createProductType,
      input: 'text',
      successDispatch: () => dispatch(getProductType()),
    })

  return (
    <Form.Group className='mb-3'>
      <div className='d-flex justify-content-between'>
        <Form.Label>
          <small>Tipo de producto</small>
        </Form.Label>
        <Button variant='primary' className='btn-circle-small' onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faPlus} size='sm' />
        </Button>
      </div>
      <Form.Select size='sm' {...typeProduct} name='productSelect'>
        {checking ? (
          <option>Cargando...</option>
        ) : productType && productType.length > 0 ? (
          <>
            <option value='-1'>Seleccione una opci??n ({productType.length})</option>
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

  const handleClickAdd = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un sub tipo de categor??a',
      successMessage: 'Sub tipo agregado!',
      service: createProductSubType,
      id: type.value,
      input: 'text',
      successDispatch: () => dispatch(getProductSubType(type.value)),
    })

  return (
    <Form.Group className='mb-3'>
      <div className='d-flex justify-content-between'>
        <Form.Label>
          <small>Tipo de producto</small>
        </Form.Label>
        <Button variant='primary' className='btn-circle-small' onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faPlus} size='sm' />
        </Button>
      </div>
      <Form.Select size='sm' {...subTypeProduct}>
        {checking ? (
          <option>Cargando...</option>
        ) : productSubTypes && productSubTypes.length > 0 ? (
          <>
            <option value='-1'>Seleccione una opci??n ({productSubTypes.length})</option>
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
  const [checkingProductTypeValuesCategories, setCheckingProductTypeValuesCategories] =
    useState(false)
  const [typeCategoriesById, setTypesCategoriesById] = useState([])
  const [categorySelected, setCategorySelected] = useState(false)
  const [typeCatVal, setTypeCatVal] = useState([])
  const { type } = useSelector((state) => state.rootReducer.newProduct)
  const { typeCategories, checking } = useSelector(
    (state) => state.rootReducer.productTypeCategories
  )

  useEffect(() => {
    dispatch(getProductTypeCategories(type.value))
    setCategorySelected(false)
  }, [type])

  useEffect(() => {
    if (values?.typeCategory) {
      setCategorySelected(true)

      const fetchGetProductTypeValuesCategories = async () =>
        await getProductTypeValuesCategories(
          values.typeCategory,
          null,
          setTypesCategoriesById,
          setCheckingProductTypeValuesCategories
        )
      fetchGetProductTypeValuesCategories()
    }
  }, [values.typeCategory])

  useEffect(() => {
    if (values.typeCategory && values.subTypeCategory) {
      setTypeCatVal((prev) => [
        ...prev,
        { typeCat: values.typeCategory, subTypeValCat: values.subTypeCategory },
      ])
      setCategorySelected(false)
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

  const handleClickAddProductTypeCategories = () => {
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar una nueva categor??a por tipo`,
      successMessage: 'Categor??a agregada!',
      service: createProductTypeCategory,
      id: type.value,
      input: 'text',
      successDispatch: () => dispatch(getProductTypeCategories(type.value)),
    })
  }

  const handleClickAddProductTypeValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categor??a`,
      successMessage: 'Valor de categor??a agregada!',
      service: createProductsTypeValueCategory,
      id: values.typeCategory.id,
      input: 'text',
      next: () =>
        getProductTypeValuesCategories(
          values.typeCategory,
          null,
          setTypesCategoriesById,
          setCheckingProductTypeValuesCategories
        ),
    })
  return (
    <Col xxl={6}>
      <div className='d-flex align-items-center mb-1'>
        <h6 className='mb-0 pe-1'>
          Categorias por <span className='text-danger'>Tipo</span>
        </h6>
        <Button
          variant='primary'
          className='btn-circle-small'
          onClick={handleClickAddProductTypeCategories}
        >
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
                  Seleccione una opci??n ({typeCategories.length - typeCatVal.length})
                </option>
                {typeCategories.map((productType) => {
                  const hasCategoryBeenSeleted = typeCatVal.some(
                    (typeCatVal) =>
                      typeCatVal.typeCat.id === productType._id ||
                      typeCatVal.typeCat._id === productType._id
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
              <option>No se encuentran categor??as</option>
            )}
          </Form.Select>
        </Form.Group>
        {categorySelected && (
          <Form.Group className='mb-1'>
            <Form.Select size='sm' name='subTypeCategory' onChange={handleInputChange}>
              {checkingProductTypeValuesCategories ? (
                <option>Cargando...</option>
              ) : typeCategoriesById && typeCategoriesById.length > 0 ? (
                <>
                  <option value='-1'>
                    Seleccione una opci??n ({typeCategoriesById.length - 1})
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
                <option>No se encuentran valores</option>
              )}
            </Form.Select>
            <div className='d-flex justify-content-end align-items-center pe-1 pt-1'>
              <small className='text-success me-1'>Agregar valor</small>
              <Button
                variant='primary'
                className='btn-circle-small'
                onClick={handleClickAddProductTypeValueCategories}
              >
                <FontAwesomeIcon icon={faPlus} size='sm' />
              </Button>
            </div>
          </Form.Group>
        )}
      </div>
      <h6>Resumen</h6>
      <hr />
      <ListGroup as='ol' numbered>
        {typeCatVal.length === 0 ? (
          <li className='mb-1'>
            <span>
              <small>No hay categor??as cargadas</small>
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
  const [checkingProductValuesCategories, setCheckingProductValuesCategories] = useState(false)
  const [categorySelected, setCategorySelected] = useState(false)

  useEffect(() => {
    dispatch(getProductCategories())
    setCategorySelected(false)
  }, [])

  useEffect(() => {
    if (values?.category) {
      setCategorySelected(true)

      const fetchGetProductTypeValuesCategories = async () => {
        await getProductValuesCategories(
          values.category,
          null,
          setCategoryById,
          setCheckingProductValuesCategories
        )
      }
      fetchGetProductTypeValuesCategories()
    }
  }, [values.category])

  useEffect(() => {
    if (values.category && values.valCategory) {
      setCatVal((prev) => [...prev, { cat: values.category, valCat: values.valCategory }])
      setCategorySelected(false)
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

  const handleClickAddProductValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categor??a"`,
      successMessage: 'Valor de categor??a agregada!',
      service: createProductsValueCategory,
      id: values.category.id,
      input: 'text',
      next: () => getProductValuesCategories(values.category, null, setCategoryById),
    })

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
                <option value='-1'>
                  Seleccione una opci??n ({categories.length - catVal.length})
                </option>
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
        {categorySelected && (
          <Form.Group className='mb-3'>
            <Form.Select size='sm' name='valCategory' onChange={handleInputChange}>
              {checkingProductValuesCategories ? (
                <option>Cargando...</option>
              ) : categoryById && categoryById.length > 0 ? (
                <>
                  <option value='-1'>Seleccione una opci??n ({categoryById.length})</option>
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
            <div className='d-flex justify-content-end align-items-center pe-1 pt-1'>
              <small className='text-success me-1'>Agregar valor</small>
              <Button
                variant='primary'
                className='btn-circle-small'
                onClick={handleClickAddProductValueCategories}
              >
                <FontAwesomeIcon icon={faPlus} size='sm' />
              </Button>
            </div>
          </Form.Group>
        )}
      </div>
      <h6>Resumen</h6>
      <hr />
      <ListGroup as='ol' numbered>
        {catVal.length === 0 ? (
          <li className='mb-1'>
            <span>
              <small>No hay categor??as cargadas</small>
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
        img: newProduct.img,
        gender: newProduct.gender.value,
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
            <GendersForm />
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

export const CreateProduct = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cleanNewProduct())
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
