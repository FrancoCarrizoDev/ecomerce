import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export const constructorData = (dataRows = [], actionDelete, actionView, actionEdit) => {
  if (dataRows.length === 0) return
  const newData = dataRows.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
    action: (
      <div className='dataTableIconsContainer'>
        <FontAwesomeIcon icon={faEdit} className='pointer' onClick={() => actionEdit(_id, rest)} />
        <FontAwesomeIcon
          icon={faTrashAlt}
          className='pointer'
          onClick={() => actionDelete(_id, rest)}
        />
      </div>
    ),
  }))
  return newData
}
