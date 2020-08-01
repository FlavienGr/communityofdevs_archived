import Col from 'react-bootstrap/Col';
import ProjectItems from './ProjectItems';

export default function ProjectList({ data }) {
  const renderEmptyProject = (
    <div>Vous n&apos;avez pas de project en cours</div>
  );
  const renderProject = data.map(item => (
    <ProjectItems key={item.id} name={item.name} uuid={item.uuid} />
  ));
  return (
    <Col sm={12}>{data.length === 0 ? renderEmptyProject : renderProject}</Col>
  );
}
