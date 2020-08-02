import Link from 'next/link';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ButtonProfile({ logout }) {
  return (
    <>
      <Link href="/newproject">
        <a className="light">Créer un projet</a>
      </Link>
      <DropdownButton
        className="d-none d-lg-block ml-5"
        alignRight
        title="Profile"
        variant="color-black"
        id="dropdown-menu-align-right">
        <Dropdown.Item href="/profile">Informations</Dropdown.Item>
        <Dropdown.Item href="/project">Projet</Dropdown.Item>
        <Dropdown.Item href="/edit">Edit</Dropdown.Item>
        <Dropdown.Item href="/account">Compte</Dropdown.Item>
        <Dropdown.Item href="/settings">Paramètres</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#" onClick={logout}>
          Déconnexion
        </Dropdown.Item>
      </DropdownButton>
      <div className="d-lg-none">
        <Row>
          <Col sm={12}>
            <a className="light" href="/profile">
              Informations
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/project">
              Projet
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/edit">
              Edit
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/account">
              Compte
            </a>
          </Col>
          <Col sm={12}>
            <a className="light" href="/settings">
              Paramètres
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
}
