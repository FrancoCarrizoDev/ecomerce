import { useEffect, useState } from "react"
import {
  createProductsValueCategory,
  disableProductValueCategories,
  editProductValueCategory,
  getProductValuesCategories,
} from "src/services/productCategories"
import { DynamicDataTable } from "src/components/DynamicDataTable"
import { addStyleOnSelectedRow } from "src/helpers/addStyleOnSelectedRow"
import { Button } from "react-bootstrap"
import Swal from "sweetalert2"
import { openModalSuccess } from "src/helpers/sweetAlert"
import { useDispatch, useSelector } from "react-redux"
import { getProductCategories } from "src/actions/productCategories"

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
          .then(async (response) => {
            if (!response.ok) {
              const resp = await response.json()
              throw new Error(resp.msg)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(error.message)
            console.log(error.message)
          })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        openModalSuccess("Listo!", "Valor de categoría agregada!")
        getProductValuesCategories(
          categorySelected,
          setCategorySelected,
          setValuesCategories
        )
      }
    })
  }

  const viewProductValuesCategories = (text) => {
    Swal.fire(
      `Valor de la categoría ${categorySelected.name}`,
      text.value,
      "info"
    )
  }

  const editProductValuesCategories = (id, productValue) => {
    Swal.fire({
      title: `Editar valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      input: "text",
      inputValue: productValue.value,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return editProductValueCategory(id, value)
          .then(async (response) => {
            if (!response.ok) {
              const resp = await response.json()
              throw new Error(resp.msg)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(error.message)
            console.log(error.message)
          })
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Listo!", "Tu valor ya ha sido actualizado.", "success")
        getProductValuesCategories(
          categorySelected,
          setCategorySelected,
          setValuesCategories
        )
      }
    })
  }

  const deleteProductValuesCategories = (id, productValue) => {
    debugger
    Swal.fire({
      title: `Estas seguro de eliminar el valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      text: "Este cambio es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return disableProductValueCategories(id)
          .then(async (response) => {
            if (!response.ok) {
              const resp = await response.json()
              throw new Error(resp.msg)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(error.message)
            console.log(error.message)
          })
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success")
        getProductValuesCategories(
          categorySelected,
          setCategorySelected,
          setValuesCategories
        )
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
              getProductValuesCategories(
                row,
                setCategorySelected,
                setValuesCategories
              )
            }}
          />
        </div>
        {categorySelected.name && (
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
