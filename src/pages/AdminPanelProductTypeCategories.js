import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect, useState } from 'react'
import {
  createProductTypeCategory,
  createProductsTypeValueCategory,
  disableProductTypeCategories,
  disableProductTypeValueCategories,
  getProductTypeValuesCategories,
  updateProductTypeCategory,
  updateProductTypeValueCategory,
} from 'src/services/productTypeCategories'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { openModalSuccess } from 'src/helpers/sweetAlert'
import { getProductTypeCategories } from 'src/actions/productTypeCategories'

const columnsProductCategories = [
  {
    name: 'Nombres',
    selector: (row) => row.name,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

const columnsProductsValuesCategories = [
  {
    name: 'Valor',
    selector: (row) => row.value,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const AdminPanelProductTypeCategories = () => {
  const dispatch = useDispatch()
  const { typeCategories } = useSelector((state) => state.rootReducer.productTypeCategories)
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductTypeCategories())
  }, [])

  const handleClickAddProductCategories = () => {
    Swal.fire({
      title: `Agregar una nueva categoría`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return createProductTypeCategory(value)
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
        openModalSuccess('Listo!', 'Catego agregada!')
        dispatch(getProductTypeCategories())
      }
    })
  }

  const viewProductCategories = (text) => {
    Swal.fire(`Valor de la categoría `, text.name, 'info')
  }

  const editProductCategories = (id, productValue) => {
    Swal.fire({
      title: `Editar valor de la categoría ${productValue.name}`,
      input: 'text',
      inputValue: productValue.name,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return updateProductTypeCategory(id, value)
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
        Swal.fire('Listo!', 'Tu valor ya ha sido actualizado.', 'success')
        dispatch(getProductTypeCategories())
      }
    })
  }

  const deleteProductCategories = (id, productValue) => {
    Swal.fire({
      title: `Estas seguro de eliminar la categoría ${productValue.name}`,
      text: 'Este cambio es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return disableProductTypeCategories(id)
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
        Swal.fire('Eliminado!', `La categoría ${productValue.name} fue eliminada`, 'success')
        dispatch(getProductTypeCategories())
        setCategorySelected({})
      }
    })
  }

  const handleClickAddProductValueCategories = () => {
    Swal.fire({
      title: `Agregar nuevo valor de la categoría "${categorySelected.name}"`,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return createProductsTypeValueCategory(categorySelected.id, value)
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
        openModalSuccess('Listo!', 'Valor de categoría agregada!')
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  const viewProductValuesCategories = (text) => {
    Swal.fire(`Valor de la categoría ${categorySelected.name}`, text.value, 'info')
  }

  const editProductValuesCategories = (id, productValue) => {
    Swal.fire({
      title: `Editar valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      input: 'text',
      inputValue: productValue.value,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return updateProductTypeValueCategory(id, value)
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
        Swal.fire('Listo!', 'Tu valor ya ha sido actualizado.', 'success')
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  const deleteProductValuesCategories = (id, productValue) => {
    Swal.fire({
      title: `Estas seguro de eliminar el valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      text: 'Este cambio es irreversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return disableProductTypeValueCategories(id)
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
          'Completado!',
          `El valor ${productValue.value} de la categoría ${categorySelected.name} ha sido borrado exitosamente`,
          'success'
        )
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories)
      }
    })
  }

  // TODO modularizar la tabla con su título
  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <DynamicDataTable
            title={'Categorías Por Tipo'}
            handleClickAdd={handleClickAddProductCategories}
            data={typeCategories}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              getProductTypeValuesCategories(row, setCategorySelected, setValuesCategories)
            }}
            actionDelete={deleteProductCategories}
            actionView={viewProductCategories}
            actionEdit={editProductCategories}
          />
        </div>
        {categorySelected.name && (
          <div className='col-12 col-md-6 fadeIn'>
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
