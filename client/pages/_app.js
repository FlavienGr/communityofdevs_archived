import '../sass/main.scss';

import requestClient from '../api/request-client';
import Header from '../components/Header';
import HeaderDevs from '../components/HeaderDevs';

function MyApp({ Component, pageProps, currentUser, developerSection }) {
  const renderHeader = developerSection ? (
    <HeaderDevs currentUser={currentUser} />
  ) : (
    <Header currentUser={currentUser} />
  );
  return (
    <>
      {renderHeader}
      <Component {...pageProps} currentUser={currentUser} />
    </>
  );
}
MyApp.getInitialProps = async appContext => {
  const client = requestClient(appContext.ctx);
  let urlUser = '/api/v1/user/currentuser';
  const regex = /^\/devs/;
  const isPathDevs = regex.test(appContext.ctx.pathname);

  if (isPathDevs) {
    urlUser = '/api/v1/devs/currentuser';
  }
  const developerSection = isPathDevs;
  let data;
  try {
    const response = await client.get(urlUser);
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
    currentUser: data,
    developerSection
  };
};

export default MyApp;
