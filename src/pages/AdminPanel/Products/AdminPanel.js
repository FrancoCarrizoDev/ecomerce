import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectApp } from 'src/actions/appSelected'
import { APPS } from 'src/constants/apps'

export const AdminPanel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(selectApp(APPS.HOME.name))
  }, [location])
  return (
    <div className='d-flex '>
      <h2>Dashboard</h2>
    </div>
  )
}
