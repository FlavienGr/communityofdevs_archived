import ErrorItems from './errorItems';

export default function ErrorMessage({ errors }) {
  console.log(errors);
  const renderError = errors.map((item, i) => (
    <ErrorItems key={i} message={item.message} />
  ));
  return (
    <div className="alert alert-danger text-left" role="alert">
      <ul>{renderError}</ul>
    </div>
  );
}
