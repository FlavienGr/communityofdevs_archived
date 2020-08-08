import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import ErrorMessage from '../components/ErrorMessage';
import RenderSuccessMessage from '../components/RenderSuccessMessage';
import CommonErrorMessage from '../components/CommonErrorMessage';

export default function Contact() {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [object, setObject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async data => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    const url = 'http://localhost:5000/api/v1/user/contact';

    try {
      const response = await axios(url, {
        method: 'post',
        data,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success) {
        setErrorsRequest(null);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre message a été envoyé avec succès"
            setMessage={setSuccessMessage}
          />
        );
        setDisabledButton(false);
        setObject('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      if (error.response.status === 400 || error.response.status === 401) {
        return setErrorsRequest(
          <ErrorMessage errors={error.response.data.errors} />
        );
      }
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const handleInputChange = e => {
    const { value } = e.target;
    const { name } = e.target;
    const obj = {
      email: setEmail,
      object: setObject,
      msg: setMessage
    };
    if (obj[name]) {
      obj[name](value);
    }
  };
  return (
    <Layout>
      <Container fluid className="project">
        <div className="project-form">
          {errorRequest && errorRequest}
          {successMessage && successMessage}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-7 mb-5">
                <label
                  className={`login-form__label maj-label ${errors.email &&
                    'disactivate'}`}
                  htmlFor="email">
                  Votre Email
                </label>
                {errors.email && (
                  <span className="form__errors">{errors.email.message}</span>
                )}
                <input
                  type="email"
                  name="email"
                  value={email}
                  ref={register({
                    required: {
                      value: true,
                      message: "L'email doit être spécifié"
                    }
                  })}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-7 mb-5">
                <label
                  className={`login-form__label maj-label ${
                    errors.object ? 'disactivate' : ''
                  }`}
                  htmlFor="object">
                  Sujet du message
                </label>

                {errors.object && (
                  <span className="form__errors">{errors.object.message}</span>
                )}
                <input
                  type="text"
                  name="object"
                  value={object}
                  ref={register({
                    required: {
                      value: true,
                      message: 'Un sujet doit être spécifié'
                    }
                  })}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-7 mb-5">
                <label
                  className={`login-form__label maj-label ${
                    errors.msg ? 'disactivate' : ''
                  }`}
                  htmlFor="msg">
                  Votre message
                </label>

                {errors.msg && (
                  <span className="form__errors">{errors.msg.message}</span>
                )}
                <textarea
                  name="msg"
                  rows="6"
                  value={message}
                  ref={register({
                    required: {
                      value: true,
                      message: 'Un message doit être ajouté'
                    }
                  })}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-7 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={disabledButton}>
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </Layout>
  );
}
