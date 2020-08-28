import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ButtonProfileDevs from './ButtonProfileDevs';

export default function header({ currentUser }) {
  const logout = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/devs/auth/logout',
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
      <ButtonProfileDevs logout={logout} />
    </>
  ) : (
    <>
      <li>
        <Link href="/">
          <a className="btn btn-dark d-flex justify-content-stretch">
            Associations
          </a>
        </Link>
      </li>
      <li>
        <a
          href="http://localhost:5000/api/v1/devs/auth/login"
          className="btn btn-dark ml-sm-0 mt-2 mt-lg-0 ml-lg-5 d-flex justify-content-stretch">
          <div className="mr-3">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </div>
          <div>Login</div>
        </a>
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
          <Nav className="ml-auto p-3 align-items-sm-left align-items-lg-center">
            {renderButton}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
