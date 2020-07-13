import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch('email'));
  console.log(watch('cgu'));
  console.log(errors);
  return (
    <div className="container-fluid">
      <Layout>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-form">
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
                      value: 3,
                      message: 'Le nom doit contenir 3 lettres minimum'
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
                  ref={register({ required: true, minLength: 12 })}
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
                  ref={register({ required: true })}
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
                  ref={register({ required: true, minLength: 12 })}
                  className="login-form__input"
                />
              </div>
              <div className="login-form__group">
                <div className="login-form__cgu">
                  <label
                    className={`login-form__label ${errors.cgu &&
                      'disactivate'}`}
                    htmlFor="cgu"
                    aria-label="cochez la case pour accepter les conditions générales d'utilisation"></label>
                  {errors.cgu && (
                    <span className="form__errors">{errors.cgu.message}</span>
                  )}
                  <input
                    name="cgu"
                    type="checkbox"
                    ref={register({ required: true })}
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
