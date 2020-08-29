import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

const InfosDevs = () => {
  return (
    <Container fluid className="dev-home pt-5 pb-5">
      <Row className="p-5">
        <Col sm={12} lg={12} xl={12} className="text-center">
          <h1>Participer à la création d'un site ou d'une application</h1>
          <Col xl={8} className="ml-auto mr-auto mt-4 text-left">
            Envie d'aider une association ? Vous êtes au bon endroit !
            Recherchez un projet qui vous intéresse et participez à sa création
          </Col>
          <Link href="/devs/search">
            <a className="btn btn-primary mt-5">Recherchez un projet</a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default InfosDevs;
