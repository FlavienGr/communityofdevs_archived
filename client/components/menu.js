import Col from 'react-bootstrap/Col';

export default function Menu() {
  return (
    <Col md={3} sm={10} lg={2} className="profile-menu">
      <Col md={12} className="mb-3">
        <a href="/profile">Informations</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/edit">Edit</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/project">Project</a>
      </Col>
      <Col md={12} className="mb-3">
        <a href="/account">Compte</a>
      </Col>
    </Col>
  );
}
