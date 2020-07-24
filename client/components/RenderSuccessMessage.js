export default function RenderSuccessMessage({ message, setMessage }) {
  const handleSuccessMessage = () => {
    setMessage(null);
  };
  return (
    <div
      onClick={handleSuccessMessage}
      className="alert alert-success row"
      role="alert">
      <div className="col-md-6">{message}</div>
      <div className="col-md-6 text-right">X</div>
    </div>
  );
}
