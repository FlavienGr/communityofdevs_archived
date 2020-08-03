import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage';
import CommonErrorMessage from '../../components/CommonErrorMessage';

export default function ResetPassword({ token }) {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = async data => {
    setErrorsRequest(null);
    setDisabledButton(true);
    const url = `http://localhost:5000/api/v1/user/auth/reset-password/${token}`;

    try {
      const response = await axios(url, {
        method: 'put',
        data,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success) {
        setDisabledButton(false);
        Router.push('/');
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
      <div className="form-container">
        <div className="login-form">
          {errorRequest && errorRequest}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-column justify-content-center">
              <div className="form-group col-md-12">
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
              <div className="form-group col-md-12">
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
            </div>
            <div className="form-row ml-3">
              <button
                type="submit"
                className="btn btn-dark"
                disabled={disabledButton}>
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { token: context.params.token } // will be passed to the page component as props
  };
}
