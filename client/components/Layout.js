import Header from './Header';
import Footer from './Footer';

function Layout({ children, currentUser }) {
  return (
    <div className="container-fluid">
      <Header currentUser={currentUser} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
