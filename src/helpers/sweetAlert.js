import {
  createProductsValueCategory,
  getProductValuesCategories,
} from 'src/services/productCategories'
import Swal from 'sweetalert2'

export const handleClickAddProductValueCategories = (
  categorySelected,
  setCategorySelected,
  setValuesCategories
) => {
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
      return createProductsValueCategory(categorySelected.id, value)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch((error) => {
          Swal.showValidationMessage(`Ocurrió un error intente nuevamente más tarde`)
          console.log(error)
        })
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      openModalSuccess('Listo!', 'Valor de categoría agregada!')
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

export const openModalSuccess = (title, message) => {
  Swal.fire(title, message, 'success')
}

export const openModalFailed = (text) => {
  Swal.fire('Error', text, 'error')
}
