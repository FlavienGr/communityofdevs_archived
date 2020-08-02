import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../components/Layout';
import ErrorMessage from '../components/ErrorMessage';
import CommonErrorMessage from '../components/CommonErrorMessage';

export default function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = async data => {
    setErrorsRequest(null);
    setDisabledButton(true);
    const url = 'http://localhost:5000/api/v1/user/auth/login';

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
                  className={`login-form__label ${errors.email &&
                    'disactivate'}`}
                  htmlFor="email">
                  Email
                </label>
                {errors.email && (
                  <span className="form__errors">{errors.email.message}</span>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  ref={register({
                    required: {
                      value: true,
                      message: "L'email doit être spécifié"
                    }
                  })}
                  className="form-control"
                />
              </div>
              <div className="form-group col-md-12">
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
                  placeholder="password"
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
              <span className="form__line">{''}</span>
              <div className="container-button">
                <Link href="/signup">
                  <a className="btn btn-outline-dark">
                    Vous n&apos;êtes pas inscrit ? Inscrivez-vous
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
