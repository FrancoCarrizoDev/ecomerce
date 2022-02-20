import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faBell, faInbox } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const AdminTopMenu = () => {
  const { name } = useSelector((state) => state.rootReducer.appSelected)

  return (
    <div className='adminTopMenuContainer'>
      <Navbar variant='dark'>
        <Container fluid>
          <Navbar.Brand href='#'>{name !== '' ? name : 'Nombre de app no encontrada'}</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll' className='justify-content-end'>
            <NavDropdown
              title={<FontAwesomeIcon icon={faInbox} style={{ color: 'white' }} />}
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={<FontAwesomeIcon icon={faBell} style={{ color: 'white' }} />}
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
            </NavDropdown>
            <NavLink to='./' style={{ width: '35px', height: '35px' }}>
              <img
                src='http://www.w3bai.com/w3css/img_avatar3.png'
                alt='#'
                className='img-fluid rounded-circle'
              />
            </NavLink>
            <NavDropdown
              title={<FontAwesomeIcon icon={faEllipsisV} style={{ color: 'white' }} />}
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
