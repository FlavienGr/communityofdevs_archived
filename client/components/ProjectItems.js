import Col from 'react-bootstrap/Col';

export default function ProjectItems({ name, uuid }) {
  return (
    <Col
      md={7}
      className="d-flex flex-row justify-content-between project-item">
      <div>{name}</div>
      <a href={`/project/${uuid}`} className="btn btn-dark">
        Consultez
      </a>
    </Col>
  );
}
