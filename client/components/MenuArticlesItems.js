import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function MenuArticlesItems({ article, number }) {
  return (
    <a
      className="articles-items-menu text-decoration-none mr-5"
      href={`#${number}`}>
      <Col
        sm={12}
        className="mb-4 d-flex flex-row justify-content-center align-items-center">
        <Col sm={7} className="">
          {article}
        </Col>
        <Col sm={2} className="d-flex flex-row justify-content-start">
          <FontAwesomeIcon icon={faArrowRight} />
        </Col>
      </Col>
    </a>
  );
}
