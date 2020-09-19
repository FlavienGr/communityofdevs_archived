import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Router from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../api/request-client';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import RenderSuccessMessage from '../../components/RenderSuccessMessage';
import customStyles from '../../constants/customStyles';
import CommonErrorMessage from '../../components/CommonErrorMessage';
import { menuItemsUsers } from '../../constants/menuItems';

export default function ProjectId({ project }) {
  const url = 'https://communityofdevs.s3.eu-west-3.amazonaws.com/';
  const name = project.data.name || '';
  const summary = project.data.summary || '';
  const description = url + project.data.description || '';
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const requestAxios = async () => {
    const urlDelete = `http://localhost:5000/api/v1/user/project/${project.data.id}`;
    try {
      const response = await axios.delete(urlDelete, {
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
        setTimeout(() => Router.push('/project'), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const handleDeleteAccount = () => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    requestAxios();
    setIsOpen(false);
  };
  return (
    <Layout>
      <Container fluid className="project-list">
        <div className="project-list-container">
          <Row>
            <Menu items={menuItemsUsers} />

            <div className="flex-row flex-sm-row flex-md-column flex-lg-column mx-auto">
              <span className="line">{''}</span>
            </div>
            <Col md={7} sm={12} lg={8}>
              {errorRequest && errorRequest}
              {successMessage && successMessage}
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Name</div>
                <div>{name}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">{`Résumé`}</div>
                <div>{summary}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">{`Description`}</div>
                <a className="btn btn-outline-dark" href={description}>
                  Voir
                </a>
              </Col>
              <span className="form__line">{''}</span>
              <Col md={12} className="mb-5">
                <Modal
                  appElement={
                    typeof window !== 'undefined'
                      ? document.getElementById('__next')
                      : undefined
                  }
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Supprimer son projet">
                  <div style={{ width: '280px', marginBottom: '35px' }}>
                    Vous êtes sur le point de supprimer définitivement votre
                    projet
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                    <button
                      className="btn btn-danger"
                      onClick={handleDeleteAccount}
                      disabled={disabledButton}>
                      Supprimer
                    </button>
                    <button
                      className="btn btn-dark ml-auto"
                      onClick={closeModal}>
                      Annuler
                    </button>
                  </div>
                </Modal>
                <Row>
                  <Col md={2} className="mb-0">
                    <button className="btn btn-danger" onClick={openModal}>
                      Supprimer
                    </button>
                  </Col>
                  <Col md={2} className="">
                    <a
                      className="btn btn-dark"
                      href={`edit/${project.data.uuid}`}>
                      Editer
                    </a>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = {};
  try {
    const request = await server(`/api/v1/user/project/${context.params.id}`);
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { project: data } // will be passed to the page component as props
  };
}
