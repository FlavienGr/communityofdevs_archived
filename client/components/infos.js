import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Infos() {
  return (
    <section className="infos">
      <Container fluid className="d-flex align-items-center flex-lg-row">
        <Row className="d-flex align-items-center">
          <Col sm={9} md={7} lg={9} className="p-0 m-0">
            <h2 className="infos__title">
              Nous pouvons vous aider à créer votre site internet gratuitement
            </h2>
            <div className="infos__presentation">
              CommunityOfDevs est une communauté de développeurs qui aident les
              associations
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
