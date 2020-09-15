import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../api/request-client';
import ErrorMessage from '../components/ErrorMessage';
import Menu from '../components/Menu';
import Layout from '../components/Layout';
import checkMaj from '../utils/checkMaj';
import RenderSuccessMessage from '../components/RenderSuccessMessage';
import CommonErrorMessage from '../components/CommonErrorMessage';
import LineMenu from '../components/LineMenu';
import ProtectedPages from '../components/ProtectedPages';
import { menuItemsUsers } from '../constants/menuItems';

function Edit({ user: { data } }) {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [name, setName] = useState(data.name);
  const [immatriculation, setImmatriculation] = useState(data.immatriculation);
  const [street, setStreet] = useState(data.street || '');
  const [city, setCity] = useState(data.city || '');
  const [zipcode, setZipcode] = useState(data.zipcode || '');
  const [state, setState] = useState(data.state || '');

  const handleChange = e => {
    const { value } = e.target;
    switch (e.target.name) {
      case 'name':
        setName(value);
        break;
      case 'immatriculation':
        setImmatriculation(value);
        break;
      case 'street':
        setStreet(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      case 'state':
        setState(value);
        break;
      default:
        return undefined;
    }
  };

  const onSubmit = async dataFromInput => {
    setErrorsRequest(null);
    setDisabledButton(true);
    const verifData = checkMaj(dataFromInput);
    const url = 'http://localhost:5000/api/v1/user';

    try {
      const response = await axios.put(url, verifData, {
        withCredentials: true
      });
      if (response.data.success) {
        setDisabledButton(false);
        setSuccessMessage(
          <RenderSuccessMessage
            message="Les informations ont été éditées"
            setMessage={setSuccessMessage}
          />
        );
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
      <Container fluid className="profile">
        <div className="profile-container">
          <Row>
            <Menu items={menuItemsUsers} />
            <LineMenu />
            <Col md={7} sm={12} lg={8}>
              {successMessage && successMessage}
              <div className="form-container-edit">
                <div className="login-form-edit">
                  {errorRequest && errorRequest}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row justify-content-center">
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.name ? 'disactivate' : ''
                          }`}
                          htmlFor="name">
                          {` Nom de l'association`}
                        </label>
                        {errors.name && (
                          <span className="form__errors">
                            {errors.name.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="name"
                          value={name}
                          onChange={handleChange}
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
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.immatriculation ? 'disactivate' : ''
                          }`}
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
                          value={immatriculation}
                          onChange={handleChange}
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
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 text-left font-weight-bold my-3 text-uppercase">
                        Adresse
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.street ? 'disactivate' : ''
                          }`}
                          htmlFor="street">
                          {`Rue`}
                        </label>
                        {errors.street && (
                          <span className="form__errors">
                            {errors.street.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={street}
                          ref={register({
                            required: false
                          })}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-row col-md-12 justify-content-start">
                        <div className="form-group col-md-6">
                          <label
                            className={`login-form__label ${
                              errors.city ? 'disactivate' : ''
                            }`}
                            htmlFor="city">
                            {`Ville`}
                          </label>
                          {errors.city && (
                            <span className="form__errors">
                              {errors.city.message}
                            </span>
                          )}
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleChange}
                            ref={register({
                              required: false
                            })}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-row col-md-12">
                        <div className="form-group col-md-6">
                          <label
                            className={`login-form__label ${
                              errors.zipcode ? 'disactivate' : ''
                            }`}
                            htmlFor="zipcode">
                            {`Code postal`}
                          </label>
                          {errors.zipcode && (
                            <span className="form__errors">
                              {errors.zipcode.message}
                            </span>
                          )}
                          <input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={zipcode}
                            onChange={handleChange}
                            ref={register({
                              required: false
                            })}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label
                            className={`login-form__label ${
                              errors.state ? 'disactivate' : ''
                            }`}
                            htmlFor="state">
                            {`Département`}
                          </label>
                          {errors.state && (
                            <span className="form__errors">
                              {errors.state.message}
                            </span>
                          )}
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            onChange={handleChange}
                            ref={register({
                              required: false
                            })}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark my-4"
                      disabled={disabledButton}>
                      Envoyer
                    </button>
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
export default ProtectedPages(Edit);

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = {};
  try {
    const request = await server('/api/v1/user/profile');
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { user: data } // will be passed to the page component as props
  };
}
