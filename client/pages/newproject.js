import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import ErrorMessage from '../components/errorMessage';
import RenderSuccessMessage from '../components/RenderSuccessMessage';
import CommonErrorMessage from '../components/commonErrorMessage';

export default function NewProject() {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [fileName, setFileName] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async data => {
    setErrorsRequest(null);
    setSuccessMessage(null);
    setDisabledButton(true);
    const url = 'http://localhost:5000/api/v1/user/project';
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('summary', data.summary);
    formData.append('description', data.description[0]);

    try {
      const response = await axios(url, {
        method: 'post',
        data: formData,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setErrorsRequest(null);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre project a été enregistré avec succès"
            setMessage={setSuccessMessage}
          />
        );
        setDisabledButton(false);
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
  const handleInputFileChange = e => {
    setFileName(e.target.files[0].name);
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
                  className={`login-form__label maj-label ${
                    errors.name ? 'disactivate' : ''
                  }`}
                  htmlFor="name">
                  Nom du project
                </label>

                {errors.name && (
                  <span className="form__errors">{errors.name.message}</span>
                )}
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du project"
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
                  className={`login-form__label maj-label ${
                    errors.summary ? 'disactivate' : ''
                  }`}
                  htmlFor="summary">
                  Résumé
                </label>

                {errors.summary && (
                  <span className="form__errors">{errors.summary.message}</span>
                )}
                <textarea
                  name="summary"
                  placeholder="Résumé en quelques lignes..."
                  rows="6"
                  ref={register({
                    required: {
                      value: true,
                      message: 'Un résumé du project doit être spécifié'
                    },
                    minLength: {
                      value: 30,
                      message: 'Le résumé contenir 30 caractères minimum'
                    },
                    maxLength: {
                      value: 1500,
                      message:
                        'Le résumé ne doit pas contenir plus de 1500 caractères maximun'
                    }
                  })}
                  className="form-control"
                />
              </div>
              <div
                className={`col-md-7 ${errors.description ? 'mb-0' : 'mb-3'}`}>
                <div
                  className={`maj-label ${
                    errors.description ? 'disactivate' : ''
                  }`}>
                  Ajouter une description
                </div>

                {errors.description && (
                  <span className="form__errors">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="custom-file col-md-7 mb-5">
                <label className={`custom-file-label`} htmlFor="description">
                  {fileName || `Sélectionner votre fichier`}
                </label>

                <input
                  type="file"
                  name="description"
                  ref={register({
                    required: {
                      value: true,
                      message: 'Un fichier Pdf doit être ajouté'
                    },
                    minLength: {
                      value: 8,
                      message:
                        'Le mot de passe doit contenir 8 caractères minimum'
                    }
                  })}
                  className="custom-file-input"
                  onChange={handleInputFileChange}
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
