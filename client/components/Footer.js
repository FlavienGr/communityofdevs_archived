import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Footer() {
  return (
    <footer>
      <Container
        fluid
        className="d-flex flex-column justify-content-between py-2">
        <Row className="my-5 d-flex">
          <Col md={12} lg={12} className="mt-1">
            <Link href="/conditions">
              <a>{"Conditions générales d'utilisation"}</a>
            </Link>
          </Col>
          <Col md={12} lg={12} className="mt-2">
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </Col>
        </Row>
        <Row className="text-center py-1">
          <Col md={12} lg={12}>
            {`${new Date().getFullYear()}, ${`\xA9`} All rights reserved`}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
