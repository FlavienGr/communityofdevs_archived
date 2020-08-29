import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdviseDevs = () => {
  return (
    <Container fluid className="dev-home pb-5 pt-5">
      <Row className="p-5">
        <Col
          sm={12}
          lg={6}
          xl={6}
          className="text-center text-sm-center text-lg-left ">
          <h1>Ne restez pas seul !</h1>
          <Col xl={8} className="mt-4 ml-0 p-0 text-left">
            Contactez d'autres développeurs afin de collaborer pour la
            réalisation du projet que vous avez choisi.
          </Col>
        </Col>
        <Col sm={12} lg={6} xl={6} className="text-center">
          <div className="circle-block mt-5 mt-sm-3 mt-lg-0">
            <img
              src="/assets/images/brooke-cagle--uHVRvDr7pg-unsplash.jpg"
              alt="groupe de femmes qui travaillent"
              className="circle-image"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AdviseDevs;
