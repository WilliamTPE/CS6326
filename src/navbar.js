import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './navbar.css'
import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar(props) {
  var navigate = useNavigate();
  var navbarRight = (
    <>

      <Button className='loginButton' variant="outline-primary" href='/login'>Login</Button>{' '}
      <Button className='signupButton' variant="primary" href='/signup'>Sign-up</Button>{' '}
    </>
  )
  if (props.isLogged) {
    navbarRight = (
      <>
        <Navbar.Text> Welcome, {props.userName} </Navbar.Text>
        <Button className='logoutButton' variant="primary" onClick={setLogOut}>Log out</Button>{' '}
      </>
    )
  }
  function setLogOut() {
    localStorage.clear();
    navigate('/');
    window.location.reload(false);//refresh page
  }
  return (
    <Navbar className='bar' collapseOnSelect expand="lg" bg="light" variant="light" >
      <Container>
        {/* <!--Insert Logo--> */}
        <Navbar.Brand>
          <img className="img-responsive" width="50px" height="50px" src="/img/logo.png" alt="a logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <NavLink to='/' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem",
              marginTop: "0.5rem"
            }}>Home</NavLink>

            <NavDropdown title="Pictures" id="basic-nav-dropdown" >
              <NavDropdown.Item >
                <NavLink to='/searchPictures' style={{
                  color: '#678398',
                  textDecoration: "none",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>Search Pictures</NavLink></NavDropdown.Item>
              <NavDropdown.Item >
                <NavLink to='/upload' style={{
                  color: '#678398',
                  textDecoration: "none",
                  marginRight: "1rem",
                  marginTop: "0.5rem"
                }}>Upload Pictures</NavLink>
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink to='/checklist' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem",
              marginTop: "0.5rem",
              marginLeft: "1rem"
            }}>Check List</NavLink>

            <NavDropdown title="Forum" id="basic-nav-dropdown" >
              <NavDropdown.Item >
                <NavLink to='/forum' style={{
                  color: '#678398',
                  textDecoration: "none",
                  marginTop: "0.5rem"
                }}>Forum</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item >
                <NavLink to='/question/ask' style={{
                  color: '#678398',
                  textDecoration: "none",
                  marginTop: "0.5rem"
                }}>Ask a Question</NavLink>
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink to='/help' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem",
              marginTop: "0.5rem",
              marginLeft: "1rem"
            }}>Help</NavLink>
          </Nav>
          <Nav>
            {navbarRight}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default MyNavbar;