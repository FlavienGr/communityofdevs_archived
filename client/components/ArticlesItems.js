import Col from 'react-bootstrap/Col';

export default function ArticlesItems({ article, content, number }) {
  return (
    <Col sm={10} md={12} lg={12} xl={12} className="mb-5">
      <div id={number} className="mb-3 article-name">
        {article}
      </div>
      <div className="text-justify">{content}</div>
    </Col>
  );
}
