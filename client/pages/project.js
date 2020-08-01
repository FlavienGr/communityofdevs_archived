import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../api/request-client';
import Menu from '../components/menu';
import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';
import LineMenu from '../components/lineMenu';

export default function Project({ project: { data } }) {
  return (
    <Layout>
      <Container fluid className="project-list">
        <div className="project-list-container">
          <Row>
            <Menu />
            <LineMenu />
            <Col sm={12} md={10} lg={8} className="mx-auto">
              <ProjectList data={data} />
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
    const request = await server('/api/v1/user/project');
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { project: data } // will be passed to the page component as props
  };
}
