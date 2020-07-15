import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../components/Layout';

export default function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(null);

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
        setDisabledButton(null);
        Router.push('/');
      }
    } catch (error) {
      setDisabledButton(null);
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
    <div className="container-fluid">
      <Layout>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form">
              {errorRequest && errorRequest}
              <div className="login-form__group">
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
                  className="login-form__input"
                />
              </div>
              <div className="login-form__group">
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
                  className="login-form__input"
                />
              </div>
              <div className="container-button">
                <input
                  className={`button form__button ${
                    disabledButton ? 'disabled' : ''
                  }`}
                  disabled={disabledButton}
                  type="submit"
                  value="Se connecter"
                />
              </div>
              <span className="form__line">{''}</span>
              <div className="container-button">
                <Link href="/login">
                  <a className="button form__button login">
                    Je n&apos;ai pas de compte? En créer un
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
