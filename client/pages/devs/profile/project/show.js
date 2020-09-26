import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../../../../api/request-client';
import Menu from '../../../../components/Menu';
import Layout from '../../../../components/Layout';
import LineMenu from '../../../../components/LineMenu';
import ProtectedPages from '../../../../components/ProtectedPages';
import { menuItemsDevs } from '../../../../constants/menuItems';
import { dataDevs } from '../../../../constants/data';
import ProjectList from '../../../../components/ProjectList';

function ShowDevProject({ user: { data } }) {
  console.log(data);
  return (
    <Layout>
      <Container fluid className="project-dev p-5">
        <Row>
          <Menu items={menuItemsDevs} />
          <LineMenu />
          <Col sm={12} md={10} lg={8} className="mx-auto">
            <ProjectList data={data} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export default ProtectedPages(ShowDevProject, '/devs');

export async function getServerSideProps(context) {
  const server = requestServer(context);
  let data = dataDevs;
  try {
    const request = await server('/api/v1/devs/project');
    data = request.data;
  } catch (error) {
    console.log(error.response.data.errors, 'ctx');
  }

  return {
    props: { user: data } // will be passed to the page component as props
  };
}
