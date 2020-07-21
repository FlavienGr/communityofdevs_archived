import Col from 'react-bootstrap/Col';

export default function Menu() {
  return (
    <Col md={3} sm={10} className="profile-menu">
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
        <a href="/compte">Compte</a>
      </Col>
    </Col>
  );
}
