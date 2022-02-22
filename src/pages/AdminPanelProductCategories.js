import { addStyleOnSelectedRow } from "src/helpers/addStyleOnSelectedRow"
import { useEffect, useState } from "react"
import {
  createProductCategory,
  createProductsValueCategory,
  disableProductCategories,
  disableProductValueCategories,
  getProductValuesCategories,
  updateProductCategory,
  updateProductValueCategory,
} from "src/services/productCategories"
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { DynamicDataTable } from "src/components/DynamicDataTable"
import { openModalSuccess } from "src/helpers/sweetAlert"
import { getProductCategories } from "src/actions/productCategories"

const columnsProductCategories = [
  {
    name: "Nombres",
    selector: (row) => row.name,
  },
  {
    name: "Acción",
    selector: (row) => row.action,
  },
]

const columnsProductsValuesCategories = [
  {
    name: "Valor",
    selector: (row) => row.value,
  },
  {
    name: "Acción",
    selector: (row) => row.action,
  },
]

export const AdminPanelProductCategories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.rootReducer.productCategories)
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductCategories())
  }, [])

  const handleClickAddProductCategories = () => {
    Swal.fire({
      title: `Agregar una nueva categoría`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return createProductCategory(value)
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
        openModalSuccess("Listo!", "Catego agregada!")
        dispatch(getProductCategories())
      }
    })
  }

  const viewProductCategories = (text) => {
    Swal.fire(`Valor de la categoría `, text.name, "info")
  }

  const editProductCategories = (id, productValue) => {
    Swal.fire({
      title: `Editar valor de la categoría ${productValue.name}`,
      input: "text",
      inputValue: productValue.name,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return updateProductCategory(id, value)
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
        dispatch(getProductCategories())
      }
    })
  }

  const deleteProductCategories = (id, productValue) => {
    Swal.fire({
      title: `Estas seguro de eliminar la categoría ${productValue.name}`,
      text: "Este cambio es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return disableProductCategories(id)
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
        Swal.fire("Eliminado!", `La categoría ${productValue.name} fue eliminada`, "success")
        dispatch(getProductCategories())
      }
    })
  }

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
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  const viewProductValuesCategories = (text) => {
    Swal.fire(`Valor de la categoría ${categorySelected.name}`, text.value, "info")
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
        return updateProductValueCategory(id, value)
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
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  const deleteProductValuesCategories = (id, productValue) => {
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
        Swal.fire(
          "Completado!",
          `El valor ${productValue.value} de la categoría ${categorySelected.name} ha sido borrado exitosamente`,
          "success"
        )
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  // TODO modularizar la tabla con su título
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-12 col-md-6">
          <DynamicDataTable
            title={"Categorías"}
            handleClickAdd={handleClickAddProductCategories}
            data={categories}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              getProductValuesCategories(row, setCategorySelected, setValuesCategories)
            }}
            actionDelete={deleteProductCategories}
            actionView={viewProductCategories}
            actionEdit={editProductCategories}
          />
        </div>
        {categorySelected.name && (
          <div className="col-12 col-md-6 fadeIn">
            <DynamicDataTable
              title={categorySelected.name}
              handleClickAdd={handleClickAddProductValueCategories}
              data={valuesCategories}
              columns={columnsProductsValuesCategories}
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
