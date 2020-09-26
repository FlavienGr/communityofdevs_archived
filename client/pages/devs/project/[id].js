import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Router from 'next/router';

import axios from 'axios';
import Layout from '../../../components/Layout';
import ValidateChoice from '../../../components/ValidateChoice';
import ShowChoice from '../../../components/ShowChoice';
import requestServer from '../../../api/request-server';
import RenderSuccessMessage from '../../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../../components/CommonErrorMessage';

export default function DevsProjectId({ project }) {
  console.log(project);
  const url = 'https://communityofdevs.s3.eu-west-3.amazonaws.com/';
  const [projectId] = useState(project.data.id);

  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const requestAxios = async action => {
    const urlAction = `http://localhost:5000/api/v1/devs/project/action/${action}/${projectId}`;
    try {
      const response = await axios.post(urlAction, null, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre choix a été ajouté avec succès"
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
  const handleActionProject = action => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    requestAxios(action);
  };
  const renderChoice =
    project.relation === null ? (
      <ValidateChoice
        disabledButton={disabledButton}
        handleActionProject={handleActionProject}
      />
    ) : (
      <ShowChoice
        disabledButton={disabledButton}
        handleActionProject={handleActionProject}
        choice={project.relation.name}
        projectId={project.data.uuid}
      />
    );
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
                  <div>{project.data.name}</div>
                </Col>
                <Col md={12} className="mb-5">
                  <div className="profile__title mb-2">
                    <u>{`Résumé`}</u>
                  </div>
                  <div>{project.data.summary}</div>
                </Col>
                <Col md={12} className="mb-5">
                  <div className="profile__title mb-4">
                    <u>{`Description`}</u>
                  </div>
                  <a
                    className="btn btn-outline-dark"
                    href={`${url + project.data.description}`}>
                    Voir
                  </a>
                </Col>
              </Col>
              {renderChoice}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = { name: '', summary: '', description: '', id: '', relation: null };

  try {
    const request = await server(`/api/v1/devs/project/${context.params.id}`);
    data = request.data;
    data.data.relation = null;
    const { id } = data.data;
    if (id) {
      const requestRelation = await server(
        `/api/v1/devs/project/relation/${id}`
      );
      if (requestRelation.data.success) {
        const response = requestRelation.data;
        data.relation = response.data;
      }
    }
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { project: data } // will be passed to the page component as props
  };
}
