import { useState } from 'react'

// todo eliminar metodo
export const useMultipleImgField = ({ type }) => {
  const [value] = useState('')

  const onChange = (event) => {
    console.log(event.target)
  }
  return {
    type,
    value,
    onChange,
  }
}
