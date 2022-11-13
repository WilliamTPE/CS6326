import React from "react";
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, Button} from 'react-bootstrap';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import './navbar.css'

function MyNavbar(props) {
  var navigate = useNavigate();
  var navbarRight = (
    <>
    <Button className='loginButton' variant="outline-primary" href='/login'>Login</Button>{' '}
    <Button className='signupButton' variant="primary" href='/signup'>Sign-up</Button>{' '}
    </>
  )
  if(props.isLogged){
    navbarRight = (
      <>
        <Navbar.Text> Welcome, {props.userName} </Navbar.Text>
        <Button className='logoutButton' variant="outline-primary" onClick={setLogOut}>Log out</Button>{' '}
      </>
    )
  }
  function setLogOut(){
    // props.setLogIn(false)
    localStorage.clear();
    navigate('/');
    window.location.reload(false);//refresh page
  }
  return (
    <Navbar className='bar' collapseOnSelect expand="lg" bg="light" variant="light" >
      <Container>
        {/* <!--Insert Logo--> */}
        <Navbar.Brand>
          <img className="img-responsive" width="50px" height="50px"  src="/img/logo.png" alt="a logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem"
            }}>Home</NavLink>
            <NavLink to='/searchPictures' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem"
            }}>Pictures</NavLink>
            <NavLink to='/checklist' style={{
              color: '#678398',
              textDecoration: "none",
              marginRight: "1rem"
            }}>Check List</NavLink>
            <NavLink to='/forum' style={{
              color: '#678398',
              textDecoration: "none",
            }}>Forum</NavLink>
          </Nav>
          <Nav>
            {navbarRight}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;