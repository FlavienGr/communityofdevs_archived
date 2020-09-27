import Col from 'react-bootstrap/Col';
import ProjectItemsDevs from './ProjectItemsDevs';

export default function ProjectListDevs({ data }) {
  const renderEmptyProject = (
    <div>Vous n&apos;avez pas de project en cours</div>
  );
  const renderProject = data.map(item => (
    <ProjectItemsDevs key={item.project_id} name={item.name} uuid={item.uuid} />
  ));
  return (
    <Col sm={12}>{data.length === 0 ? renderEmptyProject : renderProject}</Col>
  );
}
