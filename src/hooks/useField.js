import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useField = ({ type, initialValue, action }) => {
  const [value, setValue] = useState(initialValue)
  const dispatch = useDispatch()

  const onChange = (event) => {
    setValue(event.target.value)
    action && dispatch(action(event.target.value))
  }
  console.log(value)
  return {
    type,
    value,
    onChange,
  }
}
