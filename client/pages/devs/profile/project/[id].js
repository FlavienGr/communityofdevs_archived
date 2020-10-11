import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';

import Router from 'next/router';

import axios from 'axios';
import Layout from '../../../../components/Layout';
import requestServer from '../../../../api/request-server';
import RenderSuccessMessage from '../../../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../../../components/CommonErrorMessage';
import ProtectedPages from '../../../../components/ProtectedPages';
import customStyles from '../../../../constants/customStyles';
import { menuItemsDevs } from '../../../../constants/menuItems';
import Menu from '../../../../components/Menu';
import LineMenu from '../../../../components/LineMenu';

import ChangeChoice from '../../../../components/ChangeChoice';
import MakeChoice from '../../../../components/MakeChoice';

import DevelopersList from '../../../../components/DevelopersList';

function DevsProjectShowId({ project, currentUser }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [projectId] = useState(project.data.id);

  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const choice =
    project.relation.name === 'Interested' ? (
      <strong>I&apos;m in!</strong>
    ) : (
      <strong>Interested</strong>
    );

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
        setTimeout(
          () => Router.push(`/devs/profile/project/${project.data.uuid}`),
          1000
        );
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const requestAxiosDeleteAction = async () => {
    const urlAction = `http://localhost:5000/api/v1/devs/project/action/${projectId}`;

    try {
      const response = await axios.delete(urlAction, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="It has been deleted"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push(`/devs/search`), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const requestChangeAction = async action => {
    const urlAction = `http://localhost:5000/api/v1/devs/project/action/${action}/${projectId}/`;

    try {
      const response = await axios.put(urlAction, null, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="It has been changed"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push(`/devs/profile/project/show`), 1000);
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
  const handleDeleteActionProject = () => {
    closeModal();
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    requestAxiosDeleteAction();
  };
  const handleChangeChoice = action => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    requestChangeAction(action);
  };

  const renderChoiceComponent = project.relation.name ? (
    <ChangeChoice
      name={project.relation.name}
      openModal={openModal}
      handleChangeChoice={handleChangeChoice}
    />
  ) : (
    <MakeChoice handleActionProject={handleActionProject} />
  );
  return (
    <Layout>
      <Container fluid className="project-dev p-5">
        <Row>
          <Menu items={menuItemsDevs} />
          <LineMenu />
          <Col sm={12} md={10} lg={8} className="mx-auto">
            {errorRequest && errorRequest}
            {successMessage && successMessage}
            <Modal
              appElement={
                typeof window !== 'undefined'
                  ? document.getElementById('__next')
                  : undefined
              }
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Modify your choice">
              <div style={{ width: '280px', marginBottom: '35px' }}>
                You can delete your choice. This project will be remove of your
                project list.
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                <Button
                  className="btn btn-danger"
                  onClick={handleDeleteActionProject}
                  disabled={disabledButton}>
                  Delete
                </Button>
                <button className="btn btn-dark ml-auto" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </Modal>
            <Row>
              <Col sm={12} lg={6}>
                <Col className="profile__title mb-2 ">
                  <u>Name</u>
                </Col>
                <Col>{project.data.name}</Col>
                <Col className="pt-4">
                  <Button
                    href={`/devs/project/${project.data.uuid}`}
                    variant="outline-dark">
                    Show
                  </Button>
                </Col>
              </Col>
            </Row>
            {renderChoiceComponent}
            <DevelopersList
              projectId={projectId}
              currentUser={currentUser}
              setErrorsRequest={setErrorsRequest}
              setDisabledButton={setDisabledButton}
              disabledButton={disabledButton}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default ProtectedPages(DevsProjectShowId, '/devs');

export async function getServerSideProps(context) {
  const server = requestServer(context);
  const relation = {
    project_id: '',
    project_relation_status_id: '',
    name: null,
    devs_id: ''
  };

  let data = { name: '', summary: '', description: '', id: '', uuid: '' };
  try {
    const request = await server(`/api/v1/devs/project/${context.params.id}`);
    data = request.data;
    data.relation = relation;
    if (data.data.id) {
      const { id } = data.data;
      try {
        const { data: response } = await server(
          `/api/v1/devs/project/relation/${id}`
        );
        if (response.data.project_id) {
          data.relation = response.data;
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { project: data } // will be passed to the page component as props
  };
}
