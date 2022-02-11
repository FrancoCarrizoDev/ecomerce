import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons"

export const constructorData = (dataRows = [], actionDelete, actionView, actionEdit) => {
  if (dataRows.length === 0) return
  const newData = dataRows.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
    action: (
      <div className="d-flex gap-sm">
        <FontAwesomeIcon icon={faEye} className="pointer" onClick={() => actionView(rest)} />
        <FontAwesomeIcon
          icon={faEdit}
          className="pointer"
          onClick={() => actionEdit(_id, rest)}
        />{" "}
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="pointer"
          onClick={() => actionDelete(_id, rest)}
        />
      </div>
    ),
  }))
  return newData
}
