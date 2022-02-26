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
  simpleModal: ({ title, message, status }) => Swal.fire(title, message, status),
  simpleModalFailed: (title, message) => Swal.fire(title, message, 'error'),
  customizableModal: ({
    title,
    icon,
    message = '',
    successMessage,
    service,
    successDispatch,
    next,
    ...rest
  }) => {
    return Swal.fire({
      title,
      ...rest,
      inputAttributes: {
        autocapitalize: 'off',
      },
      text: message,
      icon: icon || 'info',
      backdrop: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: (value) => {
        return service(value, rest.id ? rest.id : '')
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
        successDispatch && successDispatch()
        next && next()
      }
    })
  },
}

export const createModal = (option, configs) => {
  const typeModal = MODALS_OPTIONS[option]
  return typeModal ? typeModal(configs) : defaultModal
}
