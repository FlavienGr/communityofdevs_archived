import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="container-fluid">
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
