import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MenuArticles from '../components/MenuArticles';
import Articles from '../components/Articles';
import Layout from '../components/Layout';

export default function Conditions({ articles }) {
  return (
    <Layout>
      <Container fluid className="block-container">
        <Row>
          <MenuArticles data={articles} />
          <Articles data={articles} />
        </Row>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let data = {};
  try {
    const request = await axios('http://localhost:1337/cgus?_sort=number:ASC');
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { articles: data } // will be passed to the page component as props
  };
}
