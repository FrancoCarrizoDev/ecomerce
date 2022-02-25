import Swal from 'sweetalert2'

export const openModalSuccess = (title, message) => {
  Swal.fire(title, message, 'success')
}

export const openModalFailed = (text) => {
  Swal.fire('Error', text, 'error')
}

export const defaultModal = () => {
  Swal.fire('Error', 'No se pudo configurar un modal', 'info')
}

const MODALS_OPTIONS = {
  simpleModalSuccess: (title, message) => Swal.fire(title, message, 'success'),
  simpleModalFailed: (title, message) => Swal.fire(title, message, 'error'),
  modalWithInput: ({ title, successMessage, service, successDispatch, next, ...rest }) => {
    return Swal.fire({
      title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        return service(value, rest)
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
        openModalSuccess('Listo!', successMessage)
        successDispatch()
        next && next()
      }
    })
  },
}

export const createModal = (option, configs) => {
  const typeModal = MODALS_OPTIONS[option]
  return typeModal ? typeModal(configs) : defaultModal
}

/*
  const handleClickAddProductTypeCategories = () => {
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
        openModalSuccess('Listo!', 'Catego agregada!')
        dispatch(getProductCategories())
      }
    })
  }

*/
