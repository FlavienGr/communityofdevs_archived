import Col from 'react-bootstrap/Col';

export default function ArticlesItems({ article, title, content }) {
  return (
    <Col sm={10} md={12} lg={12} xl={12} className="">
      <div id={article} className="mb-3">
        {article}
      </div>
      <div>
        <div>{title}</div>
        {content}
      </div>
    </Col>
  );
}
