import Head from 'next/head';
import Layout from '../components/Layout';
import Infos from '../components/infos';

export default function Home({ currentUser }) {
  return (
    <>
      <Head>
        <title>Index page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout currentUser={currentUser}>
        <Infos />
      </Layout>
    </>
  );
}
