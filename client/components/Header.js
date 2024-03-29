import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ButtonProfile from './ButtonProfile';

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
      <ButtonProfile logout={logout} />
    </>
  ) : (
    <>
      <li>
        <Link href="/devs">
          <a className="btn btn-dark">Développeurs</a>
        </Link>
      </li>
      <li>
        <Link href="/login">
          <a className="btn btn-dark ml-5">Connexion</a>
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
          <Nav className="ml-auto align-items-start align-items-lg-center p-3">
            {renderButton}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
