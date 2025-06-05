import React from "react";
import { Container, Navbar } from "react-bootstrap";

export function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand>
          <h1 className="fs-3 mb-0">Cyberpunk Goon Center</h1>
        </Navbar.Brand>
        <Navbar.Text>Managing Night City's Finest Since 2077</Navbar.Text>
      </Container>
    </Navbar>
  );
}
