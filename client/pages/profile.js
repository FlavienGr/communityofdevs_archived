import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import requestServer from '../api/request-client';
import Menu from '../components/menu';
import Layout from '../components/Layout';

export default function Profile({ user: { data } }) {
  return (
    <Layout>
      <Container fluid className="profile">
        <div className="profile-container">
          <Row>
            <Menu />
            <div className="flex-row flex-sm-row flex-md-column flex-lg-column mx-auto">
              <span className="line">{''}</span>
            </div>
            <Col md={7} sm={12}>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Name</div>
                <div>{data.name}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">{`Numéro de l'association`}</div>
                <div>{data.immatriculation}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Adresse</div>
                <div>{`${data.street}, à ${data.city} ${data.zipcode}`}</div>
              </Col>
              <Col md={12} className="mb-5">
                <div className="profile__title mb-2">Email</div>
                <div>{data.email}</div>
              </Col>
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
    const request = await server('/api/v1/user/profile');
    data = request.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { user: data } // will be passed to the page component as props
  };
}
