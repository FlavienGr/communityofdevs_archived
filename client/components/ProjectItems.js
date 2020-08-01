import Col from 'react-bootstrap/Col';

export default function ProjectItems({ name, uuid }) {
  return (
    <Col
      sm={10}
      md={10}
      lg={9}
      xl={8}
      className="d-flex flex-row flex-wrap justify-content-between project-item mx-auto">
      <div className="mb-1 mr-1">{name}</div>
      <a href={`/project/${uuid}`} className="btn btn-dark">
        Consultez
      </a>
    </Col>
  );
}
