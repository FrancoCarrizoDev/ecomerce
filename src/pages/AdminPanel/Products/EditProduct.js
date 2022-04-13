import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
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
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [values, handleInputChange] = useGlobalForm(product)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [typeCatVal, setTypeCatVal] = useState([])
  const [valuesCategories, handleInputChangeCategories, reset] = useForm({})
  const [categorySelected, setCategorySelected] = useState(false)
  const [typeCategoriesById, setTypesCategoriesById] = useState([])
  const [checkingProductTypeValuesCategories, setCheckingProductTypeValuesCategories] =
    useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
      dispatch(getProductTypeCategories(data?.product_type_fk?._id))
    }
    fetchProduct()
  }, [])

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
      setCategorySelected(false)
      console.log(valuesCategories)
    }
    reset()
    dispatch(clearProductTypeCategories())
    setTypesCategoriesById([])
  }, [valuesCategories.subTypeCategory])

  useEffect(() => {
    if (valuesCategories?.typeCategory) {
      setCategorySelected(true)

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

  console.log(values)
  console.log(valuesCategories)
  console.log(categorySelected)
  console.log(typeCategoriesById)
  console.log(typeCatVal)

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
      id: product.product_type_fk.name,
      input: 'text',
      successDispatch: () =>
        dispatch(getProductTypeCategories(valuesCategories.product_type_fk._id)),
    })
  }

  const handleClickAddProductTypeValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categoría`,
      successMessage: 'Valor de categoría agregada!',
      service: createProductsTypeValueCategory,
      id: values.typeCategory.id,
      input: 'text',
      next: () =>
        getProductTypeValuesCategories(
          valuesCategories.product_type_fk._id,
          null,
          setTypesCategoriesById,
          setCheckingProductTypeValuesCategories
        ),
    })

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
                    <Form.Select size='sm' onChange={handleInputChange} name='product_type_fk'>
                      {checkingProductType ? (
                        <option>Cargando...</option>
                      ) : productType && productType.length > 0 ? (
                        <>
                          <option value={product.product_type_fk._id} selected>
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
                          name='product_sub_type_fk'
                        >
                          {checkingSubType ? (
                            <option>Cargando...</option>
                          ) : productSubTypes && productSubTypes.length > 0 ? (
                            <>
                              <option value={product.product_sub_type_fk._id} selected>
                                {product.product_sub_type_fk.name}
                              </option>
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
                                          (typeCatVal) => typeCatVal.typeCat.id === productType._id
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
                              {categorySelected && (
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
