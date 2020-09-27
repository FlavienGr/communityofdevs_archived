import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Modal from 'react-modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import customStyles from '../../constants/customStyles';
import RenderSuccessMessage from '../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../components/CommonErrorMessage';
import LineMenu from '../../components/LineMenu';
import ProtectedPages from '../../components/ProtectedPages';
import { menuItemsDevs } from '../../constants/menuItems';

function Account() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);
  const handleDeleteAccount = async () => {
    setErrorsRequest(null);
    setDisabledButton(true);
    closeModal();
    setSuccessMessage(null);
    const url = 'http://localhost:5000/api/v1/devs';
    try {
      const response = await axios.delete(url, { withCredentials: true });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre compte a été supprimer avec succès"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push('/'), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };

  return (
    <Layout>
      <Container fluid className="project-list">
        <div className="project-list-container">
          <Row>
            <Menu items={menuItemsDevs} />
            <LineMenu />
            <Col md={7} sm={12} lg={8}>
              {successMessage && successMessage}
              {errorRequest && errorRequest}

              <Col md={12} className="pl-0">
                <Col md={12} className="mb-4 pl-0">
                  <h1 className="text-danger mb-5">Danger Zone</h1>
                  <div className="font-weight-bold mb-3">
                    Supprimer son compte et ses données
                  </div>
                  <div>
                    <ul>
                      <li className="mb-2">
                        Supprimer votre profil ainsi que le processus
                        d&apos;identification. Cela n&apos;inclut pas
                        l&apos;authenfication par un tier. Vous devrez le
                        supprimer vous même.
                        <ul>
                          <li>
                            <a href="https://github.com/settings/applications">
                              GitHub profile settings
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="mb-2">
                        Supprimer tous vos liens avec vos projects et leurs
                        données
                      </li>
                      <li className="mb-2">
                        Autoriser votre pseudo à devenir disponible de nouveau
                      </li>
                    </ul>
                  </div>
                </Col>
                <Modal
                  appElement={
                    typeof window !== 'undefined'
                      ? document.getElementById('__next')
                      : undefined
                  }
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Supprimer son compte">
                  <div style={{ width: '280px', marginBottom: '35px' }}>
                    Vous êtes sur le point de supprimer définitivement votre
                    compte. Cette action est définitive.
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
                  <Col md={2} className="mb-0 ml-0">
                    <button className="btn btn-danger" onClick={openModal}>
                      Supprimer
                    </button>
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
export default ProtectedPages(Account);
