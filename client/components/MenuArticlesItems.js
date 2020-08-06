import Col from 'react-bootstrap/Col';

export default function MenuArticlesItems({ article }) {
  return (
    <Col sm={10} md={12} lg={12} xl={12} className="">
      <a href={`#${article}`}>{article}</a>
    </Col>
  );
}
