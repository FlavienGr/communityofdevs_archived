import Header from './Header';

function Layout({ children, currentUser }) {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
