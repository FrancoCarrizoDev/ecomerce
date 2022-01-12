import Spinner from "../../node_modules/react-bootstrap/esm/Spinner";

export const Loading = () => {
  return (
    <div className="spinnerContainer">
      <Spinner animation="border" role="status" variant="light">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
