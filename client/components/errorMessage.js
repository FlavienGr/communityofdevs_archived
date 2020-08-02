import ErrorItems from './ErrorItems';

export default function ErrorMessage({ errors }) {
  const renderError = errors.map((item, i) => (
    <ErrorItems key={i} message={item.message} />
  ));
  return (
    <div className="alert alert-danger text-left" role="alert">
      <ul>{renderError}</ul>
    </div>
  );
}
