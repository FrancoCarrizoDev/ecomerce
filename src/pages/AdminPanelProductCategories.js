import { useEffect, useState } from "react"
import {
  getProductsCategories,
  getProductValuesCategories,
} from "src/services/productCategories"
import { DynamicDataTable } from "src/components/DynamicDataTable"
import { addStyleOnSelectedRow } from "src/helpers/addStyleOnSelectedRow"
import { Button } from "react-bootstrap"

export const AdminPanelProductCategories = () => {
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState("")
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    let isSubscribed = true
    getProductsCategories()
      .then((data) => data.json())
      .then((response) =>
        isSubscribed ? setCategories(response.categories) : null
      )
      .catch((err) => {
        throw new Error(err)
      })
    return () => (isSubscribed = false)
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="d-flex justify-content-between mb-1">
            <h5>Categorías</h5>{" "}
            <Button variant="primary" size="sm" className="rounded-sm px-3">
              +
            </Button>
          </div>
          <DynamicDataTable
            data={categories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              getProductValuesCategories(row.id)
                .then((data) => data.json())
                .then((response) => {
                  setCategorySelected(row.name.toLowerCase())
                  setValuesCategories(response)
                })
            }}
          />
        </div>
        {valuesCategories.length > 0 && (
          <div className="col-6">
            <div className="d-flex justify-content-between mb-1">
              <h5 className="capitalize">{categorySelected}</h5>
              <Button variant="primary" size="sm" className="rounded-sm px-3">
                +
              </Button>
            </div>
            <DynamicDataTable data={valuesCategories} className="fadeIn" />
          </div>
        )}
      </div>
    </div>
  )
}
