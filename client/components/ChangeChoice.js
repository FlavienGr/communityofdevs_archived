import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ChangeChoice({ name, choice, openModal }) {
  name = name === 'Validate' ? "I'm In!" : name;
  return (
    <Row>
      <Col sm={12} lg={12} className="mt-5">
        <Col className="profile__title mb-2 ">
          <u>Your choice:</u>
        </Col>
        <Col>
          <FontAwesomeIcon
            color="#6DB65B"
            icon={faCheckCircle}
            size="lg"
            className="mr-3"
          />
          {name}
        </Col>
        <Col className="mt-2">
          {`Please, choose an action on this project `}
          {choice}
          <Button variant="outline-dark ml-3">Select</Button>
        </Col>
        <Col className="pt-4">
          <Button variant="outline-danger" onClick={openModal}>
            Delete your choice
          </Button>
        </Col>
      </Col>
    </Row>
  );
}
