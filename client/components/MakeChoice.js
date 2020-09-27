import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function MakeChoice({ handleActionProject }) {
  return (
    <Row>
      <Col sm={12} lg={12} className="mt-5">
        <Col className="profile__title mb-2 ">
          <u>Make Your choice:</u>
        </Col>
        <Col>
          <Col className="pb-4 mt-4" sm={6}>
            I&apos;m interested:{' '}
            <Button
              variant="outline-dark pl-4 ml-3"
              onClick={() => handleActionProject('Interested')}>
              <FontAwesomeIcon
                color="#6DB65B"
                icon={faCheck}
                size="lg"
                className="mr-3"
              />
            </Button>
          </Col>
          <Col className="pb-4" sm={6}>
            I&apos;m in!:{' '}
            <Button
              variant="outline-dark pl-4 ml-3"
              onClick={() => handleActionProject('Validate')}>
              <FontAwesomeIcon
                color="#6DB65B"
                icon={faCheck}
                size="lg"
                className="mr-3"
              />
            </Button>
          </Col>
        </Col>
      </Col>
    </Row>
  );
}
