import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function ChangeChoice({
  name,
  openModal,
  handleChangeChoice,
  disabled
}) {
  const [changedName, setChangedName] = useState();
  const [reverseName, setReverseName] = useState();
  const [normalName, setNormalName] = useState();

  useEffect(() => {
    // Update the name
    const newName = name === 'validate' ? 'interested' : "I'm In!";
    setChangedName(newName);
    const displayName = name === 'validate' ? "I'm In!" : 'Interested';
    setNormalName(displayName);
    const newValue = name === 'validate' ? 'interested' : 'validate';
    setReverseName(newValue);
  });
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
          {normalName}
        </Col>
        <Col className="mt-2">
          {reverseName}
          <Button
            onClick={() => handleChangeChoice(reverseName)}
            disabled={disabled}
            variant="outline-dark ml-3">
            Select
          </Button>
        </Col>
        <Col className="pt-4 mt-4">
          <Button variant="outline-danger" onClick={openModal}>
            Delete your choice
          </Button>
        </Col>
      </Col>
    </Row>
  );
}
