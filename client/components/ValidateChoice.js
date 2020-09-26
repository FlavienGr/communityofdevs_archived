import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ValidateChoice({
  disabledButton,
  handleActionProject
}) {
  return (
    <Col sm={12} lg={4} className="text-center align-items-start">
      <Col className="border border-dark p-2 rounded text-left">
        <Col className="text-center">
          <h4>It&apos;s here to validate your choice</h4>
        </Col>
        <Row className="h-100 pt-5 m-0 font-weight-bold pb-4">
          <Col sm={12}>
            <Row>
              <Col className="pb-4" sm={6}>
                I&apos;m interested:{' '}
              </Col>
              <Col sm={6}>
                <button
                  className="button btn-outline-success"
                  onClick={() => handleActionProject('Interested')}
                  disabled={disabledButton}>
                  <FontAwesomeIcon color="#6DB65B" icon={faCheck} size="lg" />
                </button>
              </Col>
            </Row>
          </Col>
          <Col sm={12}>
            <Row>
              <Col sm={6}>I&apos;m in!: </Col>
              <Col sm={6}>
                <button
                  className="button btn-outline-success"
                  onClick={() => handleActionProject('Validate')}
                  disabled={disabledButton}>
                  <FontAwesomeIcon color="#6DB65B" icon={faCheck} size="lg" />
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Col>
  );
}
