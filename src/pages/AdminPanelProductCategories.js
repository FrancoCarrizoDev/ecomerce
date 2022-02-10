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
import { useDispatch, useSelector } from "react-redux"
import { getProductCategories } from "src/actions/productCategories"

export const deleteProductValuesCategories = (id) => {
  Swal.fire({
    title: "Estas seguro de eliminar el product value " + id,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    preConfirm: () => alert("dio en ok"),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success")
    }
  })
}

export const editProductValuesCategories = (id, productValue) => {
  Swal.fire({
    title: `Editar valor  de la categoría`,
    input: "text",
    inputValue: productValue.value,
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    showLoaderOnConfirm: true,
    preConfirm: () => alert("dio en ok"),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success")
    }
  })
}

export const viewProductValuesCategories = (_id, text) => {
  Swal.fire("Valor de categoría", text.value, "info")
}

export const AdminPanelProductCategories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(
    (state) => state.rootReducer.productCategories
  )
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductCategories())
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
          <div className="col-6 fadeIn">
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
            <DynamicDataTable
              data={valuesCategories}
              actionDelete={deleteProductValuesCategories}
              actionView={viewProductValuesCategories}
              actionEdit={editProductValuesCategories}
            />
          </div>
        )}
      </div>
    </div>
  )
}
