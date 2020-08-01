import Link from 'next/link';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ButtonProfile() {
  return (
    <>
      <Link href="/newproject">
        <a className="mr-5 light">Créer un projet</a>
      </Link>
      <DropdownButton
        alignRight
        title="Profile"
        variant="color-black"
        id="dropdown-menu-align-right">
        <Dropdown.Item href="/profile">Informations</Dropdown.Item>
        <Dropdown.Item href="/project">Projet</Dropdown.Item>
        <Dropdown.Item href="/edit">Edit</Dropdown.Item>
        <Dropdown.Item href="/account">Compte</Dropdown.Item>
        <Dropdown.Item href="/settings">Paramètres</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#">Déconnexion</Dropdown.Item>
      </DropdownButton>
    </>
  );
}
