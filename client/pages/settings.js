import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from '../components/Menu';
import Layout from '../components/Layout';
import RenderSuccessMessage from '../components/RenderSuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import CommonErrorMessage from '../components/CommonErrorMessage';
import LineMenu from '../components/LineMenu';

export default function Settings() {
  const { register, handleSubmit, errors } = useForm();
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmitPassword = async updatedData => {
    setDisabledButton(true);
    setSuccessMessage(null);
    setErrorsRequest(null);
    const url = 'http://localhost:5000/api/v1/user/auth/change-password';

    try {
      const response = await axios.post(url, updatedData, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre password a été modifier avec succès, vous allez être dirigé sur la page de connexion"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push('/login'), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      if (error.response.status === 400 || error.response.status === 401) {
        return setErrorsRequest(
          <ErrorMessage errors={error.response.data.errors} />
        );
      }
      setErrorsRequest(<CommonErrorMessage />);
    }
  };

  return (
    <Layout>
      <Container fluid className="project-list">
        <div className="project-list-container">
          <Row>
            <Menu />
            <LineMenu />
            <Col md={7} sm={12} lg={8}>
              {successMessage && successMessage}
              {errorRequest && errorRequest}
              <form onSubmit={handleSubmit(onSubmitPassword)}>
                <div className="form-row justify-content-start">
                  <Col md={12} className="mb-5">
                    <div className="font-weight-bold">
                      Changer son mot de passe
                    </div>
                  </Col>
                  <div className="form-group col-md-7">
                    <label
                      className={`login-form__label ${errors.password &&
                        'disactivate'}`}
                      htmlFor="oldPassword">
                      Votre ancien mot de passe
                    </label>
                    {errors.oldPassword && (
                      <span className="form__errors">
                        {errors.oldPassword.message}
                      </span>
                    )}
                    <input
                      type="password"
                      name="oldPassword"
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
                  <div className="form-group col-md-7">
                    <label
                      className={`login-form__label ${
                        errors.password ? 'disactivate' : ''
                      }`}
                      htmlFor="name">
                      Nouveau mot de passe
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
                  <div className="form-group col-md-7">
                    <label
                      className={`login-form__label ${
                        errors.passwordConfirmation ? 'disactivate' : ''
                      }`}
                      htmlFor="name">
                      Confirmation
                    </label>

                    {errors.passwordConfirmation && (
                      <span className="form__errors">
                        {errors.passwordConfirmation.message}
                      </span>
                    )}
                    <input
                      type="password"
                      name="passwordConfirmation"
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
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
}
