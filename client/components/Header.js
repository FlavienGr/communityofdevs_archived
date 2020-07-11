import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

export default function header({ currentUser }) {
  const logout = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/user/auth/logout',
        {
          withCredentials: true
        }
      );
      if (response.data.success) {
        Router.push('/');
      }
    } catch (error) {}
  };
  const renderButton = currentUser.success ? (
    <button variant="dark" onClick={logout}>
      Signout
    </button>
  ) : (
    <Link href="/auth/signin">
      <a className="button">connexion</a>
    </Link>
  );

  return (
    <header>
      <div className="container header">
        <div className="header__title">
          <Link href="/">
            <a>
              <h1>CommunityOfDevs</h1>
            </a>
          </Link>
        </div>
        <div className="header__nav">
          <nav>
            <ul>
              <li>
                <a className="button" href="#devs">
                  Développeurs
                </a>
              </li>
              <li>{renderButton}</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
