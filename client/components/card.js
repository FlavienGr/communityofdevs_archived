import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CardItems({ desc, number, image, alt }) {
  return (
    <Row>
      <Col md="4" className="mr-9">
        <Card
          style={{ width: '18rem', height: '18rem' }}
          className="d-flex justify-content-between align-items-center">
          <Card.Img
            variant="top"
            src={image}
            alt={alt}
            className="cards__image pt-2"
          />
          <Card.Body className="d-flex flex-column justify-content-start align-items-center mt-3">
            <Card.Title>{number}</Card.Title>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

// {
/* <div className="cards__block">
      <div className="cards__image">
        <img className="cards__image--elm" src={} alt={alt} />
      </div>
      <div className="cards__body">{desc}</div>
      <div className="cards__number">{number}</div>
    </div> */
// }
