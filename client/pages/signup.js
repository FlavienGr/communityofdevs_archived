import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Layout from '../components/Layout';

export default function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);

  const onSubmit = async data => {
    setErrorsRequest(null);
    const url = 'http://localhost:5000/api/v1/user/auth/signup';
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        Router.push('/');
      }
    } catch (error) {
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
                  className={`login-form__label ${errors.name &&
                    'disactivate'}`}
                  htmlFor="name">
                  {` Nom de l'association`}
                </label>
                {errors.name && (
                  <span className="form__errors">{errors.name.message}</span>
                )}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  ref={register({
                    required: {
                      value: true,
                      message: 'Le nom est requis'
                    },
                    minLength: {
                      value: 4,
                      message: 'Le nom doit contenir 4 lettres minimum'
                    }
                  })}
                  className="login-form__input"
                />
              </div>
              <div className="login-form__group">
                <label
                  className={`login-form__label ${errors.immatriculation &&
                    'disactivate'}`}
                  htmlFor="immatriculation">
                  {`Immatriculation de l'association`}
                </label>
                {errors.immatriculation && (
                  <span className="form__errors">
                    {errors.immatriculation.message}
                  </span>
                )}
                <input
                  type="text"
                  id="immatriculation"
                  name="immatriculation"
                  placeholder="immatriculation"
                  ref={register({
                    required: {
                      value: true,
                      message: "L'immatriculation doit être spécifiée"
                    },
                    maxLength: {
                      value: 15,
                      message:
                        "L'immatriculation doit contenir 15 caractères maximun"
                    }
                  })}
                  className="login-form__input"
                />
              </div>
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
              <div className="login-form__group">
                {errors.cgu && (
                  <span className="form__errors">{errors.cgu.message}</span>
                )}
                <div className="login-form__cgu">
                  <label
                    className={`login-form__label ${errors.cgu &&
                      'disactivate'}`}
                    htmlFor="cgu"
                    aria-label="cochez la case pour accepter les conditions générales d'utilisation"></label>

                  <input
                    name="cgu"
                    type="checkbox"
                    ref={register({
                      required: {
                        value: true,
                        message:
                          'Vous devez accepter les CGU pour pouvoir continer'
                      }
                    })}
                  />
                  <div className="login-form__cgu--infos">
                    En cochant cette case, vous certifiez avoir lu et accepté
                    sans réserve les conditions générales d’utilisation
                  </div>
                </div>
              </div>
              <div className="container-button">
                <input
                  className="button form__button"
                  type="submit"
                  value="Créer mon compte"
                />
              </div>
              <span className="form__line">{''}</span>
              <div className="container-button">
                <Link href="/login">
                  <a className="button form__button login">
                    J’ai déjà un compte? Se connecter
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
