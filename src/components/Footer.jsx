import React from "react";
import { Container } from "react-bootstrap";

export function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>Cyberpunk Goon Management</h5>
            <p className="mb-0">Keep track of your Goon runners</p>
          </div>
          <div>
            <p className="mb-0">
              © {new Date().getFullYear()} Night Corp. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
