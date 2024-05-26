// components/NotFound.tsx
import React from "react";
import { Container } from 'react-bootstrap';

const NotFound: React.FC = () => {
  return (
    <Container className='text-center d-flex flex-column justify-content-center align-items-center mt-2'>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;
