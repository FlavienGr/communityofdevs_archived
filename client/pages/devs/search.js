import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../api/request-client';
import Layout from '../../components/Layout';
import ProtectedPages from '../../components/ProtectedPages';

function Search(props) {
  const { register, handleSubmit, errors } = useForm();
  const [disabledButton, setDisabledButton] = useState(false);

  return (
    <Layout>
      <Container fluid className="search-dev">
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={8} xl={8}>
            <form>
              <Col sm={12} className="input-group">
                {errors.search && (
                  <span data-cy="span-search" className="form__errors">
                    {errors.search.message}
                  </span>
                )}
                <input
                  type="search"
                  name="search"
                  placeholder="Ex: Paris, ou Île-de-France"
                  ref={register({
                    required: false
                  })}
                  className="form-control"
                  aria-label="Search by city or department"
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={disabledButton}>
                    Rechercher
                  </button>
                </div>
              </Col>
            </form>
          </Col>
        </Row>
        <Row className="justify-content-center my-5">
          <Col sm={10} md={8} lg={8} xl={8}>
            <span className="form__line">{''}</span>
            No project found.
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default ProtectedPages(Search, '/devs');

// export async function getServerSideProps(context) {
//   const server = requestServer(context);
//   let data = dataDevs;
//   try {
//     const request = await server('/api/v1/devs/projects');
//     data = request.data;
//   } catch (error) {
//     console.log(error.response.data.errors, 'ctx');
//   }

//   return {
//     props: { projects: data } // will be passed to the page component as props
//   };
// }
