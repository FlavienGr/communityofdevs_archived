import '../sass/main.scss';
import requestClient from './api/request-client';

function MyApp({ Component, pageProps, currentUser }) {
  return <Component {...pageProps} currentUser={currentUser} />;
}
MyApp.getInitialProps = async appContext => {
  const client = requestClient(appContext.ctx);
  let data;
  try {
    const response = await client.get('/api/v1/user/currentuser');
    data = response.data;
  } catch (error) {
    data = {
      success: false,
      errors: [
        {
          message: 'unauthenticate'
        }
      ]
    };
  }
  const pageProps = {};
  return {
    pageProps,
    currentUser: data
  };
};

export default MyApp;
