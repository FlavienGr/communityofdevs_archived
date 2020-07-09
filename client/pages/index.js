import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home({ currentUser }) {
  return (
    <>
      <Head>
        <title>Index page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout currentUser={currentUser}> </Layout>
    </>
  );
}
