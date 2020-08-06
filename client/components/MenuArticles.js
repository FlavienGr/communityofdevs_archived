import Col from 'react-bootstrap/Col';
import MenuArticlesItems from './MenuArticlesItems';

export default function MenuArticles({ data }) {
  const renderEmptyMenu = <div>No data</div>;
  const renderMenu = data.map(item => (
    <MenuArticlesItems key={item.id} article={item.article} />
  ));
  return <Col md={6}>{data.length === 0 ? renderEmptyMenu : renderMenu}</Col>;
}
