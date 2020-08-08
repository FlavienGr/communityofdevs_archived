import Col from 'react-bootstrap/Col';
import ArticlesItems from './ArticlesItems';

export default function Articles({ data }) {
  const renderEmptyArticles = <div>Aucun article</div>;
  const renderArticles = data.map(item => (
    <ArticlesItems
      key={item.id}
      article={item.article}
      content={item.content}
      number={item.number}
    />
  ));
  return (
    <Col md={7}>
      {data.length === 0 ? (
        renderEmptyArticles
      ) : (
        <article>
          <h2 className="ml-2 mb-4">Conditions Générales d'Utilisation</h2>
          {renderArticles}
        </article>
      )}
    </Col>
  );
}
