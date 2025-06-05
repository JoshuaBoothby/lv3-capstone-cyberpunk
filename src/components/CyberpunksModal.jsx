import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React from "react";

const GOON_TYPES = {
  "Easy Goon": {
    stats: {
      skill: 8,
      initiative: 4,
      move: 5,
      armorHead: 0,
      armorBody: 7,
      health: 15,
    },
    weapons: [
      "Light Melee Weapon",
      "Medium Melee Weapon",
      "SMG",
      "Medium Pistol",
    ],
    cyberware: [
      "Light Tattoo",
      "Big Knucks",
      "Chipware Socket",
      "Anti-Dazzle",
      "Internal Agent",
      "Talon Foot",
    ],
    description:
      "Dim-brained doomba, low-level enforcer barely capable of loading a gun",
  },
  "Average Goon": {
    stats: {
      skill: 11,
      initiative: 6,
      move: 6,
      armorHead: 4,
      armorBody: 7,
      health: 25,
    },
    weapons: [
      "Heavy Melee Weapon",
      "Heavy Pistol",
      "Heavy SMG",
      "Very Heavy Pistol",
      "Very Heavy Melee Weapon",
      "Armor-Piercing Grenades",
    ],
    cyberware: [
      "Skate Foot",
      "Rippers",
      "Pain Editor",
      "Chyron",
      "Internal Agent",
      "Grip Foot",
    ],
    description: "Common combatant with training and combat experience",
  },
  "Elite Goon": {
    stats: {
      skill: 14,
      initiative: 8,
      move: 7,
      armorHead: 11,
      armorBody: 11,
      health: 35,
    },
    weapons: [
      "Very Heavy Pistol",
      "Very Heavy Melee Weapon",
      "Shotgun",
      "Assault Rifle",
    ],
    cyberware: [
      "Skate Foot",
      "Wolvers",
      "Pain Editor",
      "Anti-Dazzle",
      "Sandevistan",
      "Low Light/Infrared/UV",
    ],
    description:
      "Elite fighter who can dodge bullets and has a terrifying kill count",
  },
};

export default function CyberpunksModal({
  show,
  onHide,
  form,
  onChange,
  onSave,
}) {
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    const goonData = GOON_TYPES[selectedType] || {};

    const getRandomUnique = (array, count) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const numCyberware = selectedType === "Elite Goon" ? 2 : 1;
    const selectedCyberware = getRandomUnique(
      goonData.cyberware || [],
      numCyberware
    );

    const randomWeaponIndex = Math.floor(
      Math.random() * goonData.weapons.length
    );
    const selectedWeapon = goonData.weapons[randomWeaponIndex];

    onChange({
      target: {
        name: "type",
        value: selectedType,
        stats: goonData.stats,
        cyberware: selectedCyberware,
        weapon: selectedWeapon,
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Cyberpunk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={onChange} />
          </Form.Group>

          <Form.Group controlId="formType" className="mb-3">
            <Form.Label>Goon Type</Form.Label>
            <Form.Select
              name="type"
              value={form.type}
              onChange={handleTypeChange}
            >
              <option value="">Select a type...</option>
              {Object.keys(GOON_TYPES).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            {form.type && GOON_TYPES[form.type] && (
              <div className="mt-2">
                <small className="text-muted">
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <p className="mb-3">{GOON_TYPES[form.type].description}</p>

                  <p>
                    <strong>Stats:</strong>
                  </p>
                  <ul>
                    <li>Skill: {GOON_TYPES[form.type].stats.skill}</li>
                    <li>
                      Initiative: {GOON_TYPES[form.type].stats.initiative}
                    </li>
                    <li>Move: {GOON_TYPES[form.type].stats.move}</li>
                    <li>
                      Armor: {GOON_TYPES[form.type].stats.armorHead}SP (Head) /{" "}
                      {GOON_TYPES[form.type].stats.armorBody}SP (Body)
                    </li>
                    <li>Health: {GOON_TYPES[form.type].stats.health}HP</li>
                  </ul>

                  <p>
                    <strong>Selected Weapon:</strong> {form.weapon}
                  </p>
                  <p>
                    <strong>Selected Cyberware:</strong>
                  </p>
                  <ul>
                    {form.cyberware &&
                      form.cyberware.map((cyber, index) => (
                        <li key={index}>{cyber}</li>
                      ))}
                  </ul>
                </small>
              </div>
            )}
          </Form.Group>

          <Form.Group controlId="formImageUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="imageUrl"
              value={form.imageUrl}
              onChange={onChange}
              placeholder="optional"
            />
          </Form.Group>

          <Form.Group controlId="formNotes" className="mb-3">
            <Form.Label>Initial Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Add any initial notes about this goon..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save CyberGoon
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
