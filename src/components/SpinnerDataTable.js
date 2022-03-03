import { Spinner } from 'react-bootstrap'

export const SpinnerDataTable = () => (
  <div className='px-3 pb-3 pt-2 fadeIn'>
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  </div>
)
