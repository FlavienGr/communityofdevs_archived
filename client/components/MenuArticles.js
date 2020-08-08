import Col from 'react-bootstrap/Col';
import MenuArticlesItems from './MenuArticlesItems';

export default function MenuArticles({ data }) {
  const renderEmptyMenu = <div>No data</div>;
  const renderMenu = data.map(item => (
    <MenuArticlesItems
      key={item.id}
      article={item.article}
      number={item.number}
    />
  ));
  return (
    <Col md={5} className="justify-content-center">
      {data.length === 0 ? renderEmptyMenu : renderMenu}
    </Col>
  );
}
