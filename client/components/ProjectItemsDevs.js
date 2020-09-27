import Col from 'react-bootstrap/Col';

export default function ProjectItemsDevs({ name, uuid }) {
  return (
    <Col
      sm={10}
      md={10}
      lg={9}
      xl={8}
      className="d-flex flex-row flex-wrap justify-content-between project-item">
      <div className="mb-1 mr-1">{name}</div>
      <a href={`/devs/profile/project/${uuid}`} className="btn btn-dark">
        Consultez
      </a>
    </Col>
  );
}
