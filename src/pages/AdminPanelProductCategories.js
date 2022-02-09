import { useEffect, useState } from "react"
import {
  getProductsCategories,
  getProductValuesCategories,
} from "src/services/productCategories"
import { DynamicDataTable } from "src/components/DynamicDataTable"
import { addStyleOnSelectedRow } from "src/helpers/addStyleOnSelectedRow"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2"

export const AdminPanelProductCategories = () => {
  const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState({})
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

  const handleClickAddProductValueCategories = () => {
    Swal.fire({
      title: `Agregar nuevo valor de la categoría "${categorySelected}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`)
          })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        })
      }
    })
  }

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
                  setCategorySelected({ name: row.name, id: row.id })
                  setValuesCategories(response)
                })
            }}
          />
        </div>
        {valuesCategories.length > 0 && (
          <div className="col-6">
            <div className="d-flex justify-content-between mb-1">
              <h5 className="capitalize">
                {categorySelected.name.toLowerCase()}
              </h5>
              <Button
                variant="primary"
                size="sm"
                className="rounded-sm px-3"
                onClick={handleClickAddProductValueCategories}
              >
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
