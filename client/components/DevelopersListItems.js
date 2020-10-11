function DevelopersListItems({ name, projectId, id }) {
  const url = `http://localhost:3000/devs/${projectId}/${id}`;
  return (
    <li className="link-dev">
      <a href={url}>{name}</a>
    </li>
  );
}

export default DevelopersListItems;
