import { useEffect, useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { cleanSelectedProductCategories, selectCategory } from 'src/actions/product'
import { getProductsCategories } from 'src/services/productCategories'
import { ReactModal } from './ReactModal'

export const CategoriesFilter = ({ width }) => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  useEffect(() => {
    dispatch(cleanSelectedProductCategories())
    const fetchCategories = async () => {
      const response = await getProductsCategories()
      setCategories(response)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    dispatch(selectCategory(selectedCategories))
  }, [selectedCategories])

  const handleSelectCategory = ({ id, categoryId, name }) => {
    const categoryExists = selectedCategories.find((category) => category.categoryId === categoryId)

    if (!categoryExists) {
      setSelectedCategories([...selectedCategories, { id, categoryId, name }])
    }

    if (categoryExists) {
      setSelectedCategories([
        ...selectedCategories.filter((category) => category.categoryId !== categoryId),
        { id, categoryId, name },
      ])
    }
  }

  const handleClickRemoveFilters = () => {
    const radios = document.querySelectorAll('input[type=radio]:checked')
    radios.forEach((radio) => {
      radio.checked = false
    })
    setSelectedCategories([])
  }

  return (
    <>
      {width < 768 ? (
        <div className='d-flex justify-content-evenly mb-3'>
          <Button variant='primary' size='sm' onClick={() => setModalShow(true)}>
            FILTROS
          </Button>
          <Button variant='primary' size='sm' onClick={() => setModalShow(true)}>
            ORDENAR
          </Button>
          <ReactModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      ) : (
        categories.length > 0 && (
          <>
            <Accordion>
              {categories.map((category, index) => (
                <Accordion.Item key={`accordionId-${category._id + index}`} eventKey={category._id}>
                  <Accordion.Header>{category.name}</Accordion.Header>
                  {category.values.length > 0 && (
                    <Accordion.Body>
                      <Form>
                        <Form.Group>
                          {category.values.map(({ _id, value }, index) => (
                            <Form.Check
                              key={`valuesCategory-${_id + index}`}
                              type='radio'
                              label={value}
                              name={`category-${category._id}`}
                              id={_id}
                              data-name={value}
                              onClick={(e) =>
                                handleSelectCategory({
                                  id: e.target.id,
                                  categoryId: category._id,
                                  name: e.target.dataset.name,
                                })
                              }
                            />
                          ))}
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              ))}
            </Accordion>
            <div className='d-flex justify-content-end mt-2'>
              <span>
                <button className='btn btn-sm btn-link' onClick={handleClickRemoveFilters}>
                  Quitar filtros
                </button>
              </span>
            </div>
          </>
        )
      )}
    </>
  )
}

/* <Accordion.Item eventKey='0'>
            <Accordion.Header>TALLE</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group>
                  <Form.Check
                    type='radio'
                    label='XL'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios1'
                  />
                  <Form.Check
                    type='radio'
                    label='L'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios2'
                  />
                  <Form.Check
                    type='radio'
                    label='M'
                    name='formHorizontalRadios'
                    id='formHorizontalRadios3'
                  />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item> */
