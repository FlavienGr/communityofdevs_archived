import Col from 'react-bootstrap/Col';

export default function Menu({ items }) {
  const renderItemsMenu = items.map((item, i) => {
    return (
      <Col key={i} md={12} className="mb-3">
        <a href={item.link}>{item.name}</a>
      </Col>
    );
  });
  return (
    <Col sm={12} md={3} lg={2} className="d-none d-lg-block profile-menu">
      {renderItemsMenu}
    </Col>
  );
}
