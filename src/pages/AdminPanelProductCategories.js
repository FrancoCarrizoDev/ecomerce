import { useEffect, useState } from "react"
import {
  createProductsValueCategory,
  getProductValuesCategories,
} from "src/services/productCategories"
import { DynamicDataTable } from "src/components/DynamicDataTable"
import { addStyleOnSelectedRow } from "src/helpers/addStyleOnSelectedRow"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { openModalSuccess } from "src/helpers/sweetAlert"
// import { getProductValuesCategoriesD } from "src/actions/productValuesCategories"
import { useDispatch, useSelector } from "react-redux"
import { getProductCategoriesD } from "src/actions/productCategories"

export const AdminPanelProductCategories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(
    (state) => state.rootReducer.productCategories
  )
  // const [categories, setCategories] = useState([])
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductCategoriesD())
    // Prueba para ver si funciona el reducer de productValuesCat
    // dispatch(getProductValuesCategoriesD())
  }, [])

  const handleClickAddProductValueCategories = () => {
    Swal.fire({
      title: `Agregar nuevo valor de la categoría "${categorySelected.name}"`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return createProductsValueCategory(categorySelected.id, value)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(
              `Ocurrió un error intente nuevamente más tarde`
            )
            console.log(error)
          })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        openModalSuccess("Listo!", "Valor de categoría agregada!")
        getProductValuesCategories(categorySelected.id)
          .then((data) => data.json())
          .then((response) => {
            setCategorySelected({
              name: categorySelected.name,
              id: categorySelected.id,
            })
            setValuesCategories(response)
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
