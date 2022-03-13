import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const createHtmlModal = () =>
  MySwal.fire({
    title: <p>Hello World</p>,
    footer: 'Copyright 2018',
    didOpen: () => {
      // `MySwal` is a subclass of `Swal`
      //   with all the same instance & static methods
      MySwal.clickConfirm()
    },
  }).then(() => {
    return MySwal.fire(
      'Hellow wordl',
      <>
        <p>Shorthand works too</p>
        <button className='btn btn-primary'>Click me</button>
      </>,
      'success'
    )
  })
