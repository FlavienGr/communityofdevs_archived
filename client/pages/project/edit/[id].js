import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../../api/request-client';
import Menu from '../../../components/Menu';
import Layout from '../../../components/Layout';
import removeField from '../../../utils/removeField';
import removeCopyField from '../../../utils/removeCopyField';
import RenderSuccessMessage from '../../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../../components/CommonErrorMessage';

export default function EditProject({ project }) {
  const { register, handleSubmit, errors } = useForm();

  const [fileName, setFileName] = useState(undefined);
  const [disabledButton, setDisabledButton] = useState(false);
  const [errorRequest, setErrorsRequest] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const name = project.data.name || '';
  const summary = project.data.summary || '';

  const applySuccessfulChange = () => {
    setSuccessMessage(
      <RenderSuccessMessage
        message="Votre project a été édité avec succès"
        setMessage={setSuccessMessage}
      />
    );
    setTimeout(() => Router.push('/project'), 1000);
  };
  const sendUpdatedData = async updatedData => {
    const editUrl = `http://localhost:5000/api/v1/user/project/${project.data.id}`;
    const validateData = removeField(updatedData, 'description');
    const dataReadyToSend = removeCopyField(project.data, validateData);

    if (Object.keys(dataReadyToSend).length === 0) {
      return;
    }
    try {
      const response = await axios.put(editUrl, dataReadyToSend, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Votre project a été édité avec succès"
            setMessage={setSuccessMessage}
          />
        );
        setTimeout(() => Router.push('/project'), 1000);
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(
        <div className="alert alert-danger text-center" role="alert">
          Une erreur est survenue, merci de reéssayer ultérieurement
        </div>
      );
    }
  };
  const sendUpdatedDataWithPdf = async updatedData => {
    const uploadUrl = `http://localhost:5000/api/v1/user/project/upload/${project.data.id}`;
    const formData = new FormData();
    formData.append('description', updatedData.description[0]);

    try {
      sendUpdatedData(updatedData);
      const response = await axios(uploadUrl, {
        method: 'PUT',
        data: formData,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        setDisabledButton(false);
      }
    } catch (error) {
      setDisabledButton(false);
      setSuccessMessage(null);
      setErrorsRequest(<CommonErrorMessage />);
    }
  };
  const onSubmit = async updatedData => {
    setErrorsRequest(null);
    // setDisabledButton(true);
    if (updatedData.description.length > 0) {
      sendUpdatedDataWithPdf(updatedData);
      return applySuccessfulChange();
    }
    sendUpdatedData(updatedData);
    return applySuccessfulChange();
  };
  const handleInputFileChange = e => {
    if (e.target.files.length > 0) {
      const input = e.target.files[0].name;
      setFileName(input);
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
              <div className="form-container-edit">
                <div className="login-form-edit">
                  {errorRequest && errorRequest}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row justify-content-start">
                      <div className="form-group col-md-7 mb-5">
                        <label
                          className={`login-form__label maj-label ${
                            errors.name ? 'disactivate' : ''
                          }`}
                          htmlFor="name">
                          Nom du project
                        </label>

                        {errors.name && (
                          <span className="form__errors">
                            {errors.name.message}
                          </span>
                        )}
                        <input
                          type="text"
                          name="name"
                          defaultValue={name}
                          ref={register({
                            required: {
                              value: true,
                              message: 'Un nom doit être ajouté au project'
                            },
                            minLength: {
                              value: 3,
                              message:
                                'Le npm doit contenir 3 caractères minimum'
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
                          <span className="form__errors">
                            {errors.summary.message}
                          </span>
                        )}
                        <textarea
                          name="summary"
                          placeholder="Résumé en quelques lignes..."
                          rows="6"
                          defaultValue={summary}
                          ref={register({
                            required: {
                              value: true,
                              message: 'Un résumé du project doit être spécifié'
                            },
                            minLength: {
                              value: 30,
                              message:
                                'Le résumé contenir 30 caractères minimum'
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
                        className={`col-md-7 ${
                          errors.description ? 'mb-0' : 'mb-3'
                        }`}>
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
                        <label
                          className={`custom-file-label`}
                          htmlFor="description">
                          {fileName || `Sélectionner votre fichier`}
                        </label>

                        <input
                          type="file"
                          name="description"
                          ref={register({
                            required: false
                          })}
                          filename={fileName}
                          className="custom-file-input"
                          onChange={handleInputFileChange}
                        />
                      </div>

                      <div className="col-md-7 d-flex justify-content-start">
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
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = {};
  try {
    const request = await server(`/api/v1/user/project/${context.params.id}`);
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { project: data } // will be passed to the page component as props
  };
}
