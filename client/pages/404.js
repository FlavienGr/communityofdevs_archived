import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../components/Layout';

export default function Error404() {
  return (
    <Layout>
      <Container fluid className="block-container">
        <Row className="notfound-page justify-content-center">
          <Col
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="mb-5 d-flex flex-column align-items-center">
            <h1>404</h1>
            <div>This page does not exist</div>
          </Col>
          <Col
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="mb-5 d-flex flex-column align-items-center">
            <Link href="/">
              <a className="btn btn-dark">Go to Home</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
