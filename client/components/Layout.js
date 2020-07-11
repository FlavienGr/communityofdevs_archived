import Header from './Header';

function Layout({ children, currentUser }) {
  return (
    <div className="container-fluid">
      <Header currentUser={currentUser} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
