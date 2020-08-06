import Col from 'react-bootstrap/Col';
import ArticlesItems from './ArticlesItems';

export default function Articles({ data }) {
  const renderEmptyArticles = <div>Aucun article</div>;
  const renderArticles = data.map(item => (
    <ArticlesItems
      key={item.id}
      article={item.article}
      content={item.content}
      title={item.secondTitle}
    />
  ));
  return (
    <Col md={6}>{data.length === 0 ? renderEmptyArticles : renderArticles}</Col>
  );
}
