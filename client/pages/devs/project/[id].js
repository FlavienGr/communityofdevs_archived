import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Layout from '../../../components/Layout';
import requestServer from '../../../api/request-server';
import RenderSuccessMessage from '../../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../../components/CommonErrorMessage';

export default function DevsProjectId({ project }) {
  const url = 'https://communityofdevs.s3.eu-west-3.amazonaws.com/';
  const name = project.data.name || '';
  const summary = project.data.summary || '';
  const description = url + project.data.description || '';

  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const requestAxios = async action => {
    const url = `http://localhost:5000/api/v1/devs/project/action/${action}`;
    try {
      const response = await axios.post(url, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre projet a été supprimer avec succès"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push('/devs/project'), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const handleActionProject = () => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    requestAxios();
  };
  return (
    <Layout>
      <Container fluid className="project-list">
        <Row className="pb-5">
          <Col sm={12} className="pl-5 pt-5 text-left">
            {errorRequest && errorRequest}
            {successMessage && successMessage}
            <Row>
              <Col sm={12} lg={6}>
                <Col md={12} className="mb-5">
                  <div className="profile__title mb-2 ">
                    <u>Name</u>
                  </div>
                  <div>{name}</div>
                </Col>
                <Col md={12} className="mb-5">
                  <div className="profile__title mb-2">
                    <u>{`Résumé`}</u>
                  </div>
                  <div>{summary}</div>
                </Col>
                <Col md={12} className="mb-5">
                  <div className="profile__title mb-4">
                    <u>{`Description`}</u>
                  </div>
                  <a className="btn btn-outline-dark" href={description}>
                    Voir
                  </a>
                </Col>
              </Col>
              <Col sm={12} lg={4} className="text-center align-items-start">
                <Col className="border border-dark p-2 rounded text-left">
                  <Col className="text-center">
                    <h4>It's here to validate your choice</h4>
                  </Col>
                  <Row className="h-100 pt-5 m-0 font-weight-bold pb-4">
                    <Col sm={12}>
                      <Row>
                        <Col className="pb-4" sm={6}>
                          I'm interested:{' '}
                        </Col>
                        <Col sm={6}>
                          <button
                            className="button btn-outline-success"
                            onClick={handleActionProject}
                            disabled={disabledButton}>
                            <FontAwesomeIcon
                              color="#6DB65B"
                              icon={faCheck}
                              size="lg"
                            />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={12}>
                      <Row>
                        <Col sm={6}>I'm in!: </Col>
                        <Col sm={6}>
                          <button
                            className="button btn-outline-success"
                            onClick={() => console.log('hello')}
                            onClick={handleActionProject}
                            disabled={disabledButton}>
                            <FontAwesomeIcon
                              color="#6DB65B"
                              icon={faCheck}
                              size="lg"
                            />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = {};
  try {
    const request = await server(`/api/v1/devs/project/${context.params.id}`);
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { project: data } // will be passed to the page component as props
  };
}
