import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ContactUs from '../../ContactUs/index'


function Header() {
  return (
    <Navbar bg="dark" expand="lg"> {/* Use React Bootstrap Navbar component */}
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link href="https://home.openweathermap.org/">About Open Weather</Nav.Link>
              <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
     </Navbar>
  );
}

export default Header;