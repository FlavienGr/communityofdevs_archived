import axios from 'axios';
import showdown from 'showdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../components/Layout';

export default function Help({ helps, instructions }) {
  const converter = new showdown.Converter();
  const intro = converter.makeHtml(helps.content);
  const infos = converter.makeHtml(instructions.content);

  function createContentMarkup(content) {
    return { __html: content };
  }

  return (
    <Layout>
      <Container fluid className="block-container">
        <Row className="justify-content-center mb-5">
          <Col sm={11} md={10} lg={10} xl={10}>
            <div dangerouslySetInnerHTML={createContentMarkup(intro)} />
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col sm={11} md={10} lg={10} xl={10}>
            <div dangerouslySetInnerHTML={createContentMarkup(infos)} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  let helps = {};
  let instructions = {};
  try {
    const requestHelps = await axios('http://localhost:1337/helps/1');
    const requestInstructions = await axios(
      'http://localhost:1337/instructions/1'
    );

    helps = requestHelps.data;
    instructions = requestInstructions.data;
  } catch (error) {
    console.log(error, 'ctx');
  }
  return {
    props: { helps, instructions }
  };
}
