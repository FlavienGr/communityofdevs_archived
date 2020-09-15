import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../api/request-client';
import Menu from '../components/Menu';
import Layout from '../components/Layout';
import LineMenu from '../components/LineMenu';
import ProtectedPages from '../components/ProtectedPages';
import { menuItemsUsers } from '../constants/menuItems';

function Profile({ user: { data } }) {
  console.log(data, 'data');
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [immatriculation, setImmatriculation] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [zipcode, setZipcode] = useState(null);

  useEffect(() => {
    if (data !== undefined) {
      setEmail(data.email);
      setName(data.name);
      setImmatriculation(data.immatriculation);
      setCity(data.city);
      setStreet(data.street);
      setZipcode(data.zipcode);
    }
  }, []);
  return (
    <Layout>
      <Container fluid className="profile">
        <div className="profile-container">
          <Row>
            <Menu items={menuItemsUsers} />
            <LineMenu />
            <Col md={7} sm={12}>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Nom</div>
                <div>{name}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">{`Numéro de l'association`}</div>
                <div>{immatriculation}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Adresse</div>
                <div className="mb-2">{street || undefined}</div>
                <div className="mb-2">{city || undefined}</div>
                <div className="mb-2">{zipcode || undefined}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Email</div>
                <div>{email}</div>
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    </Layout>
  );
}
export default ProtectedPages(Profile);

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = {};
  try {
    const request = await server('/api/v1/user/profile');
    data = request.data;
  } catch (error) {
    console.log(error.response.data.errors, 'ctx');
  }
  return {
    props: { user: data } // will be passed to the page component as props
  };
}
