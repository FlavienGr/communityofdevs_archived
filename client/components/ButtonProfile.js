import Link from 'next/link';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ButtonProfile() {
  return (
    <>
      <Link href="/">
        <a className="mr-5 light">Créer un project</a>
      </Link>
      <DropdownButton
        alignRight
        title="Profile"
        variant="color-black"
        id="dropdown-menu-align-right">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
      </DropdownButton>
    </>
  );
}
