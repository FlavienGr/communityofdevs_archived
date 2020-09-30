import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function DevelopersList() {
  return (
    <Col className="mt-5">
      <hr />
      <Col>
        <h4>Developers</h4>
      </Col>
      <Col className="mt-4">
        <form>
          <div className="form-check form-check-inline mr-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="all"
              checked
            />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>
          <div className="form-check form-check-inline mr-5">
            <input type="checkbox" className="form-check-input" id="validate" />
            <label className="form-check-label" htmlFor="validate">
              I&apos;m in!
            </label>
          </div>
          <div className="form-check form-check-inline mr-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="interested"
            />
            <label className="form-check-label" htmlFor="interested">
              Interested
            </label>
          </div>
          <Col className="pl-0 mt-4">
            <Button variant="dark" type="submit" class="btn btn-primary">
              Search
            </Button>
          </Col>
        </form>
      </Col>
    </Col>
  );
}
