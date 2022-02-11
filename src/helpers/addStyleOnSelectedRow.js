export const addStyleOnSelectedRow = (id) => {
  document.querySelectorAll('[role="row"]').forEach((el) => el.classList.remove("selectedRow"))
  document.getElementById("row-" + id).classList.add("selectedRow")
}
