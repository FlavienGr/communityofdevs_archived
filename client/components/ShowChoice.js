import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ShowChoice({
  disabledButton,
  handleActionProject,
  choice,
  projectId
}) {
  const renderChoice =
    choice === 'Interested' ? (
      <Col sm={12}>
        <Row>
          <Col className="d-flex flex-column justify-content-center" sm={6}>
            I&apos;m interested:
          </Col>
          <Col sm={6}>
            <FontAwesomeIcon
              color="#6DB65B"
              icon={faCheckCircle}
              size="lg"
              className="mr-3"
            />
          </Col>
        </Row>
      </Col>
    ) : (
      <Col sm={12}>
        <Row>
          <Col sm={6}>I&apos;m in!: </Col>
          <Col sm={6}>
            <FontAwesomeIcon
              color="#6DB65B"
              icon={faCheckCircle}
              size="lg"
              className="mr-3"
            />
          </Col>
        </Row>
      </Col>
    );

  return (
    <Col sm={12} lg={4} className="text-center align-items-start">
      <Col className="border border-dark p-2 rounded text-left">
        <Col className="text-center">
          <h4>You have chosen:</h4>
        </Col>
        <Row className="h-100 pt-5 m-0 font-weight-bold pb-4">
          {renderChoice}
          <Col sm={6} className="mt-4">
            <Button
              variant="outline-dark"
              href={`/devs/profile/project/${projectId}`}>
              Modify
            </Button>
          </Col>
        </Row>
      </Col>
    </Col>
  );
}
