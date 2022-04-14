import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Form, InputGroup, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getProductSubType } from 'src/actions/productSubTypes'
import { getProductType } from 'src/actions/productType'
import {
  clearProductTypeCategories,
  getProductTypeCategories,
} from 'src/actions/productTypeCategories'
import { createModal } from 'src/helpers/sweetAlert'
import { useForm, useGlobalForm } from 'src/hooks/useForm'
import { getProductById } from 'src/services/product'
import { createProductType } from 'src/services/productType'
import {
  createProductsTypeValueCategory,
  createProductTypeCategory,
  getProductTypeValuesCategories,
} from 'src/services/productTypeCategories'
import { fetchUploadImage } from 'src/services/upload'
import { MODAL_TYPES } from 'src/types/modalTypes'
import { getProductCategories, clearProductCategories } from 'src/actions/productCategories'
import {
  createProductCategory,
  createProductsValueCategory,
  getProductValuesCategories,
} from 'src/services/productCategories'
import Swal from 'sweetalert2'
export const EditProduct = () => {
  const dispatch = useDispatch()
  const { productType, checking: checkingProductType } = useSelector(
    (state) => state.rootReducer.productType
  )
  const { productSubTypes, checking: checkingSubType } = useSelector(
    (state) => state.rootReducer.productSubTypes
  )
  const { typeCategories, checkingTypeCategories } = useSelector(
    (state) => state.rootReducer.productTypeCategories
  )
  const { categories, checking: checkingGlobalCategories } = useSelector(
    (state) => state.rootReducer.productCategories
  )
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [values, handleInputChange] = useGlobalForm(product)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [typeCatVal, setTypeCatVal] = useState([])
  const [valuesCategories, handleInputChangeCategories, reset] = useForm({})
  const [typeCategorySelected, setTypeCategorySelected] = useState(false)
  const [typeCategoriesById, setTypesCategoriesById] = useState([])
  const [checkingProductTypeValuesCategories, setCheckingProductTypeValuesCategories] =
    useState(false)
  const [categorySelected, setCategorySelected] = useState(false)
  const [catVal, setCatVal] = useState([])
  const [checkingProductValuesCategories, setCheckingProductValuesCategories] = useState(false)
  const [categoryById, setCategoryById] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
      dispatch(getProductTypeCategories(data?.product_type_fk?._id))
      let typeCatVals = []
      let catVals = []
      data?.product_tyc_val_tyc_fk.forEach((element) => {
        typeCatVals = [
          ...typeCatVals,
          { typeCat: element.product_tyc_fk, subTypeValCat: element.product_val_tyc_fk },
        ]
      })
      data?.product_cat_val_cat_fk.forEach((element) => {
        catVals = [...catVals, { cat: element.product_cat_fk, valCat: element.product_val_cat_fk }]
      })
      setCatVal(catVals)
      setTypeCatVal(typeCatVals)
    }
    fetchProduct()
  }, [])

  useEffect(() => {
    if (
      +valuesCategories.product_type_fk?._id !== -1 ||
      +product.product_type_fk._id.value !== -1
    ) {
      dispatch(getProductSubType(values.product_type_fk || product.product_type_fk?._id))
    }
  }, [values.product_type_fk, product.product_type_fk])

  useEffect(() => {
    if (values.product_type_fk)
      Swal.fire({
        title: 'Estás seguro?',
        text: 'Si cambia el tipo se borrarán las cateogrías por tipo previamente seleccionadas y deberá seleccionar nuevamente un sub tipo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Lo eniendo!',
      }).then((result) => {
        if (result.isConfirmed) {
          setTypeCatVal([])
          dispatch(clearProductTypeCategories())
          dispatch(getProductTypeCategories(values.product_type_fk || product.product_type_fk?._id))
          setTypeCategorySelected(false)
        }
      })
  }, [values.product_type_fk])

  useEffect(() => {
    if (files.length > 0) {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('collection', files[i])
      }

      const ejectFetchUploadImage = async () => {
        setUploading(true)
        const resp = await fetchUploadImage(formData)
        setProduct((state) => ({ ...state, img: [...state.img, ...resp] }))
        setUploading(false)
      }
      ejectFetchUploadImage()
    }
  }, [files])

  useEffect(() => {
    if (valuesCategories.typeCategory && valuesCategories.subTypeCategory) {
      setTypeCatVal((prev) => [
        ...prev,
        { typeCat: valuesCategories.typeCategory, subTypeValCat: valuesCategories.subTypeCategory },
      ])
      setTypeCategorySelected(false)
    }
    reset()
    dispatch(clearProductTypeCategories())
    dispatch(getProductTypeCategories(values.product_type_fk || product.product_type_fk?._id))
    setTypesCategoriesById([])
  }, [valuesCategories.subTypeCategory])

  useEffect(() => {
    if (valuesCategories?.typeCategory) {
      setTypeCategorySelected(true)
      const fetchGetProductTypeValuesCategories = async () =>
        await getProductTypeValuesCategories(
          valuesCategories.typeCategory,
          null,
          setTypesCategoriesById,
          setCheckingProductTypeValuesCategories
        )
      fetchGetProductTypeValuesCategories()
    }
  }, [valuesCategories.typeCategory])

  useEffect(() => {
    dispatch(getProductCategories())
    setCategorySelected(false)
  }, [])

  useEffect(() => {
    if (valuesCategories?.category) {
      setCategorySelected(true)

      const fetchGetProductTypeValuesCategories = async () => {
        await getProductValuesCategories(
          valuesCategories.category,
          null,
          setCategoryById,
          setCheckingProductValuesCategories
        )
      }
      fetchGetProductTypeValuesCategories()
    }
  }, [valuesCategories.category])

  useEffect(() => {
    if (valuesCategories.category && valuesCategories.valCategory) {
      setCatVal((prev) => [
        ...prev,
        { cat: valuesCategories.category, valCat: valuesCategories.valCategory },
      ])
      setCategorySelected(false)
    }
    reset()
    dispatch(clearProductCategories())
    dispatch(getProductCategories())
    setCategoryById([])
  }, [valuesCategories.valCategory])

  const onFileChange = (event) => {
    setFiles(event.target.files)
  }

  const handleClickViewImg = (e) => {
    const imgId = e.target.id ? e.target.id.split('-')[1] : e.target.parentNode.id.split('-')[1]
    const captureImg = product.img.find((img) => img.asset_id === imgId)
    createModal(MODAL_TYPES.imgViewer, captureImg.secure_url, 'Imágenes')
  }

  const handleClickDeleteImg = (e) => {
    const imgId = e.target.id ? e.target.id.split('-')[1] : e.target.parentNode.id.split('-')[1]
    const newImgs = product.img.filter((img) => img.asset_id !== imgId)
    setProduct((state) => ({ ...state, img: newImgs }))
  }

  const handleClickAdd = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un nuevo tipo',
      successMessage: 'Tipo agregado!',
      service: createProductType,
      input: 'text',
      successDispatch: () => dispatch(getProductType()),
    })

  const handleClickAddProductTypeCategories = () => {
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar una nueva categoría por tipo`,
      successMessage: 'Categoría agregada!',
      service: createProductTypeCategory,
      id: valuesCategories.product_type_fk?._id || product.product_type_fk._id,
      input: 'text',
      successDispatch: () =>
        dispatch(
          getProductTypeCategories(
            valuesCategories.product_type_fk?._id || product.product_type_fk._id
          )
        ),
    })
  }

  const handleClickAddProductTypeValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categoría`,
      successMessage: 'Valor de categoría agregada!',
      service: createProductsTypeValueCategory,
      id: valuesCategories.typeCategory.id,
      input: 'text',
      next: () =>
        getProductTypeValuesCategories(
          valuesCategories.typeCategory,
          null,
          setTypesCategoriesById,
          setCheckingProductTypeValuesCategories
        ),
    })

  const handleClickAddProductCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar una nueva categoría',
      successMessage: 'Categoría agregada!',
      service: createProductCategory,
      input: 'text',
      successDispatch: () => dispatch(getProductCategories()),
    })

  const handleClickAddProductValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categoría"`,
      successMessage: 'Valor de categoría agregada!',
      service: createProductsValueCategory,
      id: valuesCategories.category.id,
      input: 'text',
      next: () => getProductValuesCategories(valuesCategories.category, null, setCategoryById),
    })

  const removeTypCatValItem = (e) => {
    debugger
    const [typeCatId, subTypeCatValId] = e.target.id.split('-')

    const findIndexItemToRemove = typeCatVal.findIndex(
      (tyCatVal) =>
        (tyCatVal.typeCat.id === typeCatId || tyCatVal.typeCat._id === typeCatId) &&
        (tyCatVal.subTypeValCat.id === subTypeCatValId ||
          tyCatVal.subTypeValCat._id === subTypeCatValId)
    )
    if (findIndexItemToRemove === -1) return

    const typeCatValArr = typeCatVal
    const newTypeCatValArr = typeCatValArr.splice(findIndexItemToRemove, 1)

    if (newTypeCatValArr.length === 0) return

    setTypeCatVal([...typeCatValArr])
  }

  const removeCatValItem = (e) => {
    const [catId, valCatId] = e.target.id.split('-')

    const findIndexItemToRemove = catVal.findIndex(
      (catVal) =>
        (catVal.cat.id === catId || catVal.cat._id === catId) &&
        (catVal.valCat.id === valCatId || catVal.valCat._id === valCatId)
    )
    if (findIndexItemToRemove === -1) return

    const catValArr = catVal
    const newCatValArr = catValArr.splice(findIndexItemToRemove, 1)

    if (newCatValArr.length === 0) return

    setCatVal([...catValArr])
  }

  if (loading) return <p>Cargando...</p>

  return (
    <Container fluid className='pt-3'>
      <h4>Editar producto</h4>
      <hr />
      <Form>
        <Row>
          <Col>
            <div className='bg-white p-3 rounded-3'>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <small>Nombre</small>
                </Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  defaultValue={product.name || ''}
                  onChange={handleInputChange}
                  name='name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <small>Precio</small>
                </Form.Label>
                <InputGroup size='sm'>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label='Precio'
                    type='text'
                    defaultValue={product.price || ''}
                    name='price'
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  <small>Cantidad</small>
                </Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  defaultValue={product.quantity || ''}
                  onChange={handleInputChange}
                  name='quantity'
                />
              </Form.Group>

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
              <div className='d-flex flex-column'>
                <span>Subidas ({product.img.length})</span>
                <hr />
                <div className='d-flex'>
                  {uploading ? (
                    <p>Cargando...</p>
                  ) : (
                    product.img?.length > 0 &&
                    product.img.map((img) => (
                      <div
                        key={`img-${img.asset_id}`}
                        className='smallImgToUpload img-thumbnail me-2 mb-3'
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
                        <Button
                          id={`btnDelete-${img.asset_id}`}
                          variant='danger'
                          size='sm'
                          className='float-end me-1 pointer'
                          onClick={handleClickDeleteImg}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size={'sm'}
                            id={`svgDelete-${img.asset_id}`}
                            onClick={handleClickDeleteImg}
                          />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <Form.Group className='mb-3'>
                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <InputGroup size='sm'>
                    <InputGroup.Text>Descripción</InputGroup.Text>
                    <Form.Control
                      as='textarea'
                      type='textarea'
                      onChange={handleInputChange}
                      defaultValue={product.description || ''}
                      name='description'
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>
                  <small>Código</small>
                </Form.Label>
                <Form.Control
                  size='sm'
                  type='text'
                  name='code'
                  defaultValue={product.code || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
          </Col>
          <Col>
            <Row>
              <Col xs={12}>
                <div className='bg-white p-3 rounded-3'>
                  <Form.Group className='mb-3'>
                    <div className='d-flex justify-content-between'>
                      <Form.Label>
                        <small>Tipo de producto</small>
                      </Form.Label>
                      <Button
                        variant='primary'
                        className='btn-circle-small'
                        onClick={handleClickAdd}
                      >
                        <FontAwesomeIcon icon={faPlus} size='sm' />
                      </Button>
                    </div>
                    <Form.Select
                      size='sm'
                      onChange={handleInputChange}
                      defaultValue={product.product_type_fk._id}
                      name='product_type_fk'
                    >
                      {checkingProductType ? (
                        <option>Cargando...</option>
                      ) : productType && productType.length > 0 ? (
                        <>
                          <option value={product.product_type_fk._id}>
                            {product.product_type_fk.name}
                          </option>
                          {productType.map(
                            (productType) =>
                              productType._id !== product.product_type_fk._id && (
                                <option
                                  value={productType._id}
                                  key={`productTypeSelect-${productType._id}`}
                                >
                                  {productType.name}
                                </option>
                              )
                          )}
                        </>
                      ) : (
                        <option>No se encuentran tipos</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                  {product.product_type_fk &&
                    product.product_type_fk?.name !== '' &&
                    product.product_type_fk?.name !== '-1' && (
                      <Form.Group className='mb-3'>
                        <div className='d-flex justify-content-between'>
                          <Form.Label>
                            <small>SubTipo de producto</small>
                          </Form.Label>
                          <Button
                            variant='primary'
                            className='btn-circle-small'
                            onClick={handleClickAdd}
                          >
                            <FontAwesomeIcon icon={faPlus} size='sm' />
                          </Button>
                        </div>
                        <Form.Select
                          size='sm'
                          onChange={handleInputChange}
                          name='product_sub_type_fk'
                          defaultValue={product.product_sub_type_fk._id}
                        >
                          {checkingSubType ? (
                            <option>Cargando...</option>
                          ) : productSubTypes && productSubTypes.length > 0 ? (
                            <>
                              {productSubTypes.map((productType) => (
                                <option
                                  value={productType._id}
                                  key={`productTypeSelect-${productType._id}`}
                                >
                                  {productType.name}
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
              </Col>
              <Col xs={12}>
                {product.product_type_fk &&
                  product.product_type_fk?.name !== '' &&
                  product.product_type_fk?.name !== '-1' && (
                    <div className='bg-white p-3 rounded-3 mt-3'>
                      <h5>Asignar categorias</h5>
                      <hr />
                      <Container fluid>
                        <Row>
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
                                <Form.Select
                                  size='sm'
                                  name='typeCategory'
                                  onChange={handleInputChangeCategories}
                                >
                                  {checkingTypeCategories ? (
                                    <option>Cargando...</option>
                                  ) : typeCategories && typeCategories.length > 0 ? (
                                    <>
                                      <option value='-1'>
                                        Seleccione una opción (
                                        {typeCategories.length - typeCatVal.length})
                                      </option>
                                      {typeCategories.map((productType) => {
                                        const hasCategoryBeenSeleted = typeCatVal.some(
                                          (typeCatVal) =>
                                            typeCatVal.typeCat._id === productType._id ||
                                            typeCatVal.typeCat.id === productType._id
                                        )

                                        if (hasCategoryBeenSeleted) return null

                                        return (
                                          <option
                                            value={JSON.stringify({
                                              id: productType._id,
                                              name: productType.name,
                                            })}
                                            key={`productTypeSelect-${productType._id}`}
                                          >
                                            {productType.name}
                                          </option>
                                        )
                                      })}
                                    </>
                                  ) : (
                                    <option>No se encuentran categorías</option>
                                  )}
                                </Form.Select>
                              </Form.Group>
                              {typeCategorySelected && (
                                <Form.Group className='mb-1'>
                                  <Form.Select
                                    size='sm'
                                    name='subTypeCategory'
                                    onChange={handleInputChangeCategories}
                                  >
                                    {checkingProductTypeValuesCategories ? (
                                      <option>Cargando...</option>
                                    ) : typeCategoriesById && typeCategoriesById.length > 0 ? (
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
                                    <small>No hay categorías cargadas</small>
                                  </span>
                                </li>
                              ) : (
                                typeCatVal.map(({ typeCat, subTypeValCat }) => (
                                  <ListGroup.Item
                                    as='li'
                                    className='d-flex justify-content-between align-items-start'
                                    key={`typeValCatId-${typeCat._id || typeCat.id}`}
                                  >
                                    <div className='ms-2 me-auto'>
                                      <div className='fw-bold'>{typeCat.name}</div>
                                    </div>
                                    <Badge bg='primary' pill>
                                      {subTypeValCat.value}
                                    </Badge>
                                    <button
                                      className='btn btn-close btn-sm'
                                      id={`${typeCat._id || typeCat.id}-${
                                        subTypeValCat._id || subTypeValCat.id
                                      }`}
                                      onClick={removeTypCatValItem}
                                      type='button'
                                    ></button>
                                  </ListGroup.Item>
                                ))
                              )}
                            </ListGroup>
                          </Col>
                          <Col xxl={6}>
                            <div className='d-flex align-items-center mb-1'>
                              <h6 className='mb-0 pe-1'>
                                Categorias <span className='text-danger'>Globales</span>
                              </h6>
                              <Button variant='primary' className='btn-circle-small'>
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  size='sm'
                                  onClick={handleClickAddProductCategories}
                                />
                              </Button>
                            </div>
                            <div className='d-flex flex-xl-column justify-content-between pt-2'>
                              <Form.Group className='mb-3'>
                                <Form.Select
                                  size='sm'
                                  name='category'
                                  onChange={handleInputChangeCategories}
                                >
                                  {checkingGlobalCategories ? (
                                    <option>Cargando...</option>
                                  ) : categories && categories.length > 0 ? (
                                    <>
                                      <option value='-1'>
                                        Seleccione una opción ({categories.length - catVal.length})
                                      </option>
                                      {categories.map((productCat) => {
                                        const hasCategoryBeenSeleted = catVal.some(
                                          (typeCatVal) =>
                                            typeCatVal.cat.id === productCat._id ||
                                            typeCatVal.cat._id === productCat._id
                                        )

                                        if (hasCategoryBeenSeleted) return null

                                        return (
                                          <option
                                            value={JSON.stringify({
                                              id: productCat._id,
                                              name: productCat.name,
                                            })}
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
                                  <Form.Select
                                    size='sm'
                                    name='valCategory'
                                    onChange={handleInputChangeCategories}
                                  >
                                    {checkingProductValuesCategories ? (
                                      <option>Cargando...</option>
                                    ) : categoryById && categoryById.length > 0 ? (
                                      <>
                                        <option value='-1'>
                                          Seleccione una opción ({categoryById.length})
                                        </option>
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
                                    <small>No hay categorías cargadas</small>
                                  </span>
                                </li>
                              ) : (
                                catVal.map(({ cat, valCat }) => (
                                  <ListGroup.Item
                                    as='li'
                                    className='d-flex justify-content-between align-items-start'
                                    key={`valCatId-${cat.id || cat._id}`}
                                  >
                                    <div className='ms-2 me-auto'>
                                      <div className='fw-bold'>{cat.name}</div>
                                    </div>
                                    <Badge bg='primary' pill>
                                      {valCat.value}
                                    </Badge>
                                    <button
                                      className='btn btn-close btn-sm'
                                      id={`${cat.id || cat._id}-${valCat.id || valCat._id}`}
                                      onClick={removeCatValItem}
                                      type='button'
                                    ></button>
                                  </ListGroup.Item>
                                ))
                              )}
                            </ListGroup>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  )}
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Button variant='primary' type='submit' className='mt-3 float-end'>
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
