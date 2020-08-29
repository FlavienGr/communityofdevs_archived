import Link from 'next/link';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ButtonProfileDevs({ logout }) {
  return (
    <>
      <Link href="/devs/search">
        <a className="light">Rechercher un projet</a>
      </Link>
      <DropdownButton
        className="d-none d-lg-block ml-5"
        alignRight
        title="Profile"
        variant="color-black"
        data-cy="button-profile"
        id="dropdown-menu-align-right">
        <Dropdown.Item href="/devs/profile">Informations</Dropdown.Item>
        <Dropdown.Item href="/devs/edit">Edit</Dropdown.Item>
        <Dropdown.Item href="/devs/project">Projet</Dropdown.Item>
        <Dropdown.Item href="/devs/account">Compte</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#" onClick={logout}>
          Déconnexion
        </Dropdown.Item>
      </DropdownButton>
      <div className="d-lg-none">
        <Row>
          <Col sm={12}>
            <a className="light" href="/devs/profile">
              Informations
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/devs/project">
              Projet
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/devs/edit">
              Edit
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/devs/account">
              Compte
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
}
