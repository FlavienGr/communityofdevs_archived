import Col from 'react-bootstrap/Col';

export default function Menu() {
  return (
    <Col md={3} lg={2} className="d-none d-lg-block profile-menu">
      <Col md={12} className="mb-3">
        <a href="/profile">Informations</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/edit">Edit</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/project">Projet</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/account">Compte</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/settings">Paramètres</a>
      </Col>
    </Col>
  );
}
