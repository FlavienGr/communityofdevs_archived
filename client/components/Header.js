import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function header({ currentUser }) {
  const logout = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/user/auth/logout',
        {
          withCredentials: true
        }
      );
      if (response.data.success) {
        Router.push('/');
      }
    } catch (error) {}
  };
  const renderButton = currentUser.success ? (
    <>
      <li>
        <a href="#">profile</a>
        <ul className="dropdown">
          <li>
            <a href="#">Informations</a>
          </li>
          <li>
            <a href="#">Project</a>
          </li>
          <li>
            <a href="#">Déconnexion</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" className="button" onClick={logout}>
          Signout
        </a>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link href="/devs">
          <a className="button">Développeurs</a>
        </Link>
      </li>
      <li>
        <Link href="/signup">
          <a className="button">connexion</a>
        </Link>
      </li>
    </>
  );

  return (
    <header>
      <Navbar bg="color-primary" expand="lg">
        <Link href="/">
          <a className="navbar-brand light brand">CommunityOfDevs</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto align-items-center">
            <Link href="/">
              <a className="mr-5 light">Créer un project</a>
            </Link>
            <DropdownButton
              alignRight
              title="Profile"
              variant="color-black"
              id="dropdown-menu-align-right">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
