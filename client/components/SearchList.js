import Col from 'react-bootstrap/Col';
import SearchListItems from './SearchListItems';

export default function SearchList({ projects }) {
  const renderItems = projects.map((item, i) => {
    return <SearchListItems key={i} name={item.name} uuid={item.uuid} />;
  });
  return (
    <Col
      sm={10}
      md={8}
      lg={8}
      xl={8}
      className="d-flex flex-column align-items-left">
      {renderItems}
    </Col>
  );
}
