import Head from 'next/head';
import Layout from '../components/Layout';
import Infos from '../components/Infos';
import Cards from '../components/Cards';

export default function Home({ currentUser }) {
  return (
    <>
      <Head>
        <title>Index page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Infos />
        <Cards />
      </Layout>
    </>
  );
}
