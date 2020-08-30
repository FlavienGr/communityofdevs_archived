import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../api/request-client';
import ErrorMessage from '../../components/ErrorMessage';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import checkMaj from '../../utils/checkMaj';
import RenderSuccessMessage from '../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../components/CommonErrorMessage';
import LineMenu from '../../components/LineMenu';
import ProtectedPages from '../../components/ProtectedPages';
import { menuItemsDevs } from '../../constants/menuItems';
import { dataDevs } from '../../constants/data';

function Edit({ user: { data } }) {
  const { register, handleSubmit, errors } = useForm();
  const [errorRequest, setErrorsRequest] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [name, setName] = useState(data.name);
  const [location, setLocation] = useState(data.location);
  const [blog, setBlog] = useState(data.blog);
  const [email, setEmail] = useState(data.email);
  const [userName, setUserName] = useState(data.login);

  const handleChange = e => {
    const { value } = e.target;
    switch (e.target.name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'blog':
        setBlog(value);
        break;
      case 'username':
        setUserName(value);
        break;
      default:
        return undefined;
    }
  };

  const onSubmit = async dataFromInput => {
    setErrorsRequest(null);
    setDisabledButton(true);
    const verifData = checkMaj(dataFromInput);
    const url = 'http://localhost:5000/api/v1/devs';

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
            <Menu items={menuItemsDevs} />
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
                          {`Name`}
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
                              value: false,
                              message: 'Le nom est requis'
                            },
                            minLength: {
                              value: 3,
                              message: 'name must have 3 letters min'
                            }
                          })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.username ? 'disactivate' : ''
                          }`}
                          htmlFor="username">
                          {`Username`}
                        </label>
                        {errors.username && (
                          <span className="form__errors">
                            {errors.username.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={userName}
                          onChange={handleChange}
                          ref={register({
                            required: false,
                            minLength: {
                              value: 3,
                              message: 'Username must have 3 letters min'
                            }
                          })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.email ? 'disactivate' : ''
                          }`}
                          htmlFor="email">
                          {`Email`}
                        </label>
                        {errors.email && (
                          <span className="form__errors">
                            {errors.email.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          ref={register({
                            required: false
                          })}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.location ? 'disactivate' : ''
                          }`}
                          htmlFor="location">
                          {`Location`}
                        </label>
                        {errors.location && (
                          <span className="form__errors">
                            {errors.location.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={location}
                          ref={register({
                            required: false
                          })}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <label
                          className={`login-form__label ${
                            errors.blog ? 'disactivate' : ''
                          }`}
                          htmlFor="blog">
                          {`Website`}
                        </label>
                        {errors.blog && (
                          <span className="form__errors">
                            {errors.blog.message}
                          </span>
                        )}
                        <input
                          type="text"
                          id="blog"
                          name="blog"
                          value={blog}
                          onChange={handleChange}
                          ref={register({
                            required: false
                          })}
                          className="form-control"
                        />
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
  let data = dataDevs;
  try {
    const request = await server('/api/v1/devs/profile');
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { user: data } // will be passed to the page component as props
  };
}
