import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons"
import { capitalizeFirstLetter } from "src/helpers/capitalizeFirstLetter"

const selectorAndSortable = (key) => ({
  selector: (row) => row[key],
  sortable: true,
})

const action = { name: "Action", selector: (row) => row.action }

export const constructorDataColumns = (dataColumn = {}) => {
  if (Object.keys(dataColumn).length === 0) return

  const filtrado = Object.entries(dataColumn).filter((arr) => arr[0] !== "_id")

  const arr = []
  filtrado.forEach((data) => {
    arr.push({
      name: capitalizeFirstLetter(data[0]),
      ...selectorAndSortable(data[0]),
    })
  })
  arr.push(action)

  return arr
}

export const constructorDataRows = (
  dataRows = [],
  actionDelete,
  actionView,
  actionEdit
) => {
  if (dataRows.length === 0) return
  debugger
  const newDataRows = dataRows.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
    action: (
      <div className="d-flex gap-sm">
        <FontAwesomeIcon
          icon={faEye}
          className="pointer"
          onClick={() => actionView(_id, rest)}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="pointer"
          onClick={() => actionEdit(_id, rest)}
        />{" "}
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="pointer"
          onClick={() => actionDelete(_id)}
        />
      </div>
    ),
  }))
  return newDataRows
}
