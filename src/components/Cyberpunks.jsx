import React from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Badge,
  Form,
} from "react-bootstrap";

export default function Cyberpunks({
  cyberpunks,
  title,
  deleteCyberpunk,
  toggleKIA,
  onEditImage,
  onUpdateNotes,
  noCyberpunks,
}) {
  if (cyberpunks.length === 0)
    return <h2 className="text-center text-neon-blue mb-4">{noCyberpunks}</h2>;

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">{title}</h2>
      <Row xs={1} md={2} className="g-4">
        {cyberpunks.map((cyberpunk) => (
          <Col key={cyberpunk.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={cyberpunk.imageUrl}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>{cyberpunk.name}</span>
                  <Badge bg="info">{cyberpunk.type}</Badge>
                </Card.Title>

                {/* Stats Section */}
                {cyberpunk.stats && (
                  <div className="mb-3">
                    <h6>Stats:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      <Badge bg="secondary">
                        Skill: {cyberpunk.stats.skill}
                      </Badge>
                      <Badge bg="secondary">
                        Initiative: {cyberpunk.stats.initiative}
                      </Badge>
                      <Badge bg="secondary">Move: {cyberpunk.stats.move}</Badge>
                      <Badge bg="secondary">
                        Health: {cyberpunk.stats.health}HP
                      </Badge>
                    </div>
                    <div className="mt-1">
                      <Badge bg="secondary">
                        Armor: {cyberpunk.stats.armorHead}SP (Head) /{" "}
                        {cyberpunk.stats.armorBody}SP (Body)
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Weapon Section */}
                {cyberpunk.weapon && (
                  <div className="mb-3">
                    <h6>Weapon:</h6>
                    <Badge bg="danger">{cyberpunk.weapon}</Badge>
                  </div>
                )}

                {/* Cyberware Section */}
                {cyberpunk.cyberware && cyberpunk.cyberware.length > 0 && (
                  <div className="mb-3">
                    <h6>Cyberware:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {cyberpunk.cyberware.map((cyber, index) => (
                        <Badge key={index} bg="warning" text="dark">
                          {cyber}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <h6>Field Notes:</h6>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    id={`notes-${cyberpunk.id}`}
                    name={`notes-${cyberpunk.id}`}
                    value={cyberpunk.notes || ""}
                    placeholder="Add notes about this goon..."
                    onChange={(e) =>
                      onUpdateNotes(cyberpunk.id, e.target.value)
                    }
                    className="mb-2"
                  />
                </div>

                <div className="mt-auto d-flex gap-2">
                  <Button
                    variant={cyberpunk.kia ? "success" : "danger"}
                    className="flex-grow-1"
                    onClick={() => toggleKIA(cyberpunk.id, !cyberpunk.kia)}
                  >
                    {cyberpunk.kia ? "Revive" : "Mark as KIA"}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => onEditImage(cyberpunk)}
                  >
                    Edit Image
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteCyberpunk(cyberpunk.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
