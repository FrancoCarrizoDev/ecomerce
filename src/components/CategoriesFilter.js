import { useEffect, useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap'
import { getProductsCategories } from 'src/services/productCategories'
import { ReactModal } from './ReactModal'

export const CategoriesFilter = ({ width }) => {
  const [modalShow, setModalShow] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getProductsCategories()
      setCategories(response)
    }
    fetchCategories()
  }, [])

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
          <Accordion>
            {categories.map((category) => (
              <>
                <Accordion.Item key={category._id} eventKey={category._id}>
                  <Accordion.Header>{category.name}</Accordion.Header>
                  {category.values.length > 0 && (
                    <Accordion.Body>
                      <Form>
                        <Form.Group>
                          {category.values.map(({ _id, value }) => (
                            <Form.Check
                              key={`$valuesCategory-${_id}`}
                              type='radio'
                              label={value}
                              name={value}
                              id={_id}
                            />
                          ))}
                        </Form.Group>
                      </Form>
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              </>
            ))}
          </Accordion>
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
