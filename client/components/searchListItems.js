import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function SearchListItems({ name, uuid }) {
  return (
    <Col
      sm={10}
      md={8}
      lg={8}
      xl={8}
      className="d-flex flex-row justify-content-between project-item mr-auto">
      <Col className="text-left align-middle p-2">{name}</Col>
      <Col sm={2} md={2} lg={2} xl={2} className="d-flex justify-content-end">
        <a href={`/devs/project/${uuid}`} className="btn btn-dark">
          Select
        </a>
      </Col>
    </Col>
  );
}
