import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../components/menu';
import Layout from '../components/Layout';
import customStyles from '../constants/customStyles';
import RenderSuccessMessage from '../components/RenderSuccessMessage';
import ErrorMessage from '../components/errorMessage';
import CommonErrorMessage from '../components/commonErrorMessage';

export default function Account() {
  const { register, handleSubmit, errors } = useForm();
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
    const url = 'http://localhost:5000/api/v1/user';
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
  const onSubmitMail = async updatedData => {
    setDisabledButton(true);
    setSuccessMessage(null);
    setErrorsRequest(null);
    const url = 'http://localhost:5000/api/v1/user/auth/change-email';

    try {
      const response = await axios.post(url, updatedData, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre email a été modifier avec succès, merci de confirmer ce changement en cliquant sur lien dans l'email qui vous a été envoyé"
            setMessage={setSuccessMessage}
          />
        );
      }
    } catch (error) {
      setDisabledButton(false);
      if (error.response.status === 400 || error.response.status === 401) {
        return setErrorsRequest(
          <ErrorMessage errors={error.response.data.errors} />
        );
      }
      setErrorsRequest(
        <div className="alert alert-danger text-center" role="alert">
          Une erreur est survenue, merci de reéssayer ultérieurement
        </div>
      );
    }
  };

  return (
    <Layout>
      <Container fluid className="project-list">
        <div className="project-list-container">
          <Row>
            <Menu />
            <div className="flex-row flex-sm-row flex-md-column flex-lg-column mx-auto">
              <span className="line">{''}</span>
            </div>
            <Col md={7} sm={12} lg={8}>
              {successMessage && successMessage}
              {errorRequest && errorRequest}
              <form onSubmit={handleSubmit(onSubmitMail)}>
                <div className="form-row justify-content-start">
                  <Col md={12} className="mb-2">
                    <div className="font-weight-bold">
                      Changer son adresse email
                    </div>
                  </Col>
                  <div className="form-group col-md-7">
                    <label
                      className={`login-form__label ${
                        errors.email ? 'disactivate' : ''
                      }`}
                      htmlFor="name">
                      Email
                    </label>

                    {errors.email && (
                      <span className="form__errors">
                        {errors.email.message}
                      </span>
                    )}
                    <input
                      type="email"
                      name="email"
                      ref={register({
                        required: {
                          value: true,
                          message: 'Un nom doit être ajouté au project'
                        },
                        minLength: {
                          value: 3,
                          message: 'Le npm doit contenir 3 caractères minimum'
                        }
                      })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-7">
                    <label
                      className={`login-form__label ${
                        errors.emailConfirmation ? 'disactivate' : ''
                      }`}
                      htmlFor="name">
                      Email confirmation
                    </label>

                    {errors.emailConfirmation && (
                      <span className="form__errors">
                        {errors.emailConfirmation.message}
                      </span>
                    )}
                    <input
                      type="email"
                      name="emailConfirmation"
                      ref={register({
                        required: {
                          value: true,
                          message: 'Un nom doit être ajouté au project'
                        },
                        minLength: {
                          value: 3,
                          message: 'Le npm doit contenir 3 caractères minimum'
                        }
                      })}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-7 mb-5">
                    <label
                      className={`login-form__label ${errors.password &&
                        'disactivate'}`}
                      htmlFor="password">
                      Mot de passe
                    </label>
                    {errors.password && (
                      <span className="form__errors">
                        {errors.password.message}
                      </span>
                    )}
                    <input
                      type="password"
                      name="password"
                      ref={register({
                        required: {
                          value: true,
                          message: 'Le mot de passe doit être spécifié'
                        },
                        minLength: {
                          value: 8,
                          message:
                            'Le mot de passe doit contenir 8 caractères minimum'
                        }
                      })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-7 d-flex justify-content-start mb-3">
                    <button
                      type="submit"
                      className="btn btn-dark"
                      disabled={disabledButton}>
                      Envoyer
                    </button>
                  </div>
                </div>
              </form>
              <span className="form__line">{''}</span>
              <Col md={12} className="pl-0">
                <Col md={12} className="mb-4 pl-0">
                  <div className="font-weight-bold">
                    Supprimer son compte et ses données
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
