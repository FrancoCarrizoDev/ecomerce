import Swal from "sweetalert2"

export const openModalSuccess = (title, message) => {
  Swal.fire(title, message, "success")
}

export const openModalFailed = (text) => {
  Swal.fire("Error", text, "error")
}
