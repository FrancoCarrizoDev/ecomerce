import { Container, Navbar } from "react-bootstrap"

export const AdminTopMenu = () => {
  return (
    <div className="adminTopMenuContainer">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}
