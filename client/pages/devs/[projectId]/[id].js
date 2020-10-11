import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import Layout from '../../../components/Layout';
import requestServer from '../../../api/request-server';
import RenderSuccessMessage from '../../../components/RenderSuccessMessage';
import CommonErrorMessage from '../../../components/CommonErrorMessage';
import ProtectedPages from '../../../components/ProtectedPages';
import customStyles from '../../../constants/customStyles';
import { menuItemsDevs } from '../../../constants/menuItems';
import Menu from '../../../components/Menu';
import LineMenu from '../../../components/LineMenu';

function ShowDevs({ devs }) {
  console.log(devs, 'devs');
  return (
    <Layout>
      <Container fluid className="project-dev p-5">
        <Row>
          <Menu items={menuItemsDevs} />
          <LineMenu />
          <Col sm={12} md={10} lg={8} className="mx-auto">
            test
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ShowDevs;

export async function getServerSideProps(context) {
  const server = requestServer(context);

  const data = { name: '', location: '', email: '' };
  try {
    const { data: devs } = await server(
      `/api/v1/devs/search/devs/${context.params.projectId}/${context.params.id}`
    );
    const keys = Object.keys(data);
    const arrayDevsName = devs.data;
    for (let i = 0; i < keys.length; i++) {
      data[keys[i]] = arrayDevsName[keys[i]];
    }
  } catch (error) {
    console.log(error, 'ctx');
  }

  return {
    props: { devs: data } // will be passed to the page component as props
  };
}
