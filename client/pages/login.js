import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../components/Layout';

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
      setErrorsRequest(
        <div className="alert-danger">
          <ul className="alert-danger__ul">
            <li className="alert-danger__li">
              Une erreur est survenue, merci de reéssayer ultérieurement
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <div className="login-form">
          {errorRequest && errorRequest}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row justify-content-center">
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

            <button
              type="submit"
              className="btn btn-dark"
              disabled={!!disabledButton}>
              Se connecter
            </button>
            <span className="form__line">{''}</span>
            <div className="container-button">
              <Link href="/signup">
                <a className="btn btn-outline-dark">
                  Je n&apos;ai pas de compte? En créer un
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
