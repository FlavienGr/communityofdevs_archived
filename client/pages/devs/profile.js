import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../api/request-client';
import Menu from '../../components/Menu';
import Layout from '../../components/Layout';
import LineMenu from '../../components/LineMenu';
import ProtectedPages from '../../components/ProtectedPages';
import { menuItemsDevs } from '../../constants/menuItems';
import { dataDevs } from '../../constants/data';

function Profile({ user: { data } }) {
  const { email, name, login, location, blog, github } = data;

  return (
    <Layout>
      <Container fluid className="profile-dev p-5">
        <Row>
          <Menu items={menuItemsDevs} />
          <LineMenu />
          <Col sm={12} md={8}>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">Name</div>
              <div>{name}</div>
            </Col>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">Username</div>
              <div>{login}</div>
            </Col>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">Email</div>
              <div>{email}</div>
            </Col>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">{`Your blog`}</div>
              <div>{blog}</div>
            </Col>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">{`Location`}</div>
              <div>{location}</div>
            </Col>
            <Col md={12} className="mb-5">
              <div className="profile__title mb-2">{`URL github`}</div>
              <div>{github}</div>
            </Col>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default ProtectedPages(Profile, '/devs');

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = dataDevs;
  try {
    const request = await server('/api/v1/devs/profile');
    data = request.data;
  } catch (error) {
    console.log(error.response.data.errors, 'ctx');
  }

  return {
    props: { user: data } // will be passed to the page component as props
  };
}
