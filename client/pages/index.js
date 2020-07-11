import Head from 'next/head';
import Layout from '../components/Layout';
import Infos from '../components/infos';
import Cards from '../components/cards';

export default function Home({ currentUser }) {
  return (
    <>
      <Head>
        <title>Index page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout currentUser={currentUser}>
        <Infos />
        <Cards />
      </Layout>
    </>
  );
}
