import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorHandlerPage() {
  const error: any = useRouteError();

  return (
    <Container className="text-center d-flex flex-column h-screen mb-5">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
