import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getProductType } from 'src/actions/productType'
import { createModal } from 'src/helpers/sweetAlert'
import { useGlobalForm } from 'src/hooks/useForm'
import { getProductById } from 'src/services/product'
import { createProductType } from 'src/services/productType'
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
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [values, handleInputChange] = useGlobalForm(product)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
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

  console.log(values)
  console.log(loading)
  console.log(files)
  console.log(setUploading)

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
                          <Col xxl={6}></Col>
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
