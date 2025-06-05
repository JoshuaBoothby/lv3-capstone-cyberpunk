import React, { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CyberpunksModal from "./components/CyberpunksModal";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Cyberpunks from "./components/Cyberpunks";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  createCyberpunk,
  deleteCyberpunk,
  scanCyberpunks,
  toggleKIA,
  updateCyberpunkImage,
  updateCyberpunkNotes,
} from "./dynamo";

function App() {
  async function handleUpdateNotes(id, notes) {
    await updateCyberpunkNotes(id, notes);
    setCyberpunks((prev) =>
      prev.map((cyberpunk) =>
        cyberpunk.id === id ? { ...cyberpunk, notes } : cyberpunk
      )
    );
  }
  const [form, setForm] = useState({
    name: "",
    type: "",
    imageUrl: "",
    stats: {},
    cyberware: [],
    weapon: "",
    notes: "",
  });

  const [cyberpunks, setCyberpunks] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    scanCyberpunks().then(setCyberpunks);
  }, []);

  function handleChange(e) {
    const { name, value, type, checked, stats, cyberware, weapon } = e.target;

    setForm((prev) => {
      // Handle checkbox inputs
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }

      // Handle goon type selection with all its data
      if (name === "type" && stats) {
        return {
          ...prev,
          type: value,
          stats: stats,
          cyberware: cyberware || [],
          weapon: weapon || "",
        };
      }

      // Handle regular input changes
      return { ...prev, [name]: value };
    });

    // Debug log to verify form state
    console.log("Current form state:", form);
  }

  async function handleToggleKIA(id, kia) {
    await toggleKIA(id, kia);
    setCyberpunks((prev) => prev.map((a) => (a.id === id ? { ...a, kia } : a)));
  }

  async function handleDeleteCyberpunk(id) {
    await deleteCyberpunk(id);
    setCyberpunks((prev) => prev.filter((cyberpunk) => cyberpunk.id !== id));
  }

  async function handleEditImage(cyberpunk) {
    const imageUrl = window.prompt("Enter new image URL:", cyberpunk.imageUrl);
    if (!imageUrl) return;

    await updateCyberpunkImage(cyberpunk.id, imageUrl);
    setCyberpunks((prev) =>
      prev.map((a) => (a.id === cyberpunk.id ? { ...a, imageUrl } : a))
    );
  }

  async function handleAdd() {
    if (!form.name || !form.type) return;
    const item = {
      id: crypto.randomUUID(),
      name: form.name,
      type: form.type,
      stats: form.stats,
      weapon: form.weapon,
      cyberware: form.cyberware,
      kia: false,
      imageUrl: form.imageUrl || "https://placebear.com/300/300",
      notes: form.notes || "",
    };

    await createCyberpunk(item);
    setCyberpunks((prev) => [...prev, item]);
    setForm({
      name: "",
      type: "",
      imageUrl: "",
      stats: {},
      cyberware: [],
      weapon: "",
    });
    setShow(false);
  }

  const available = cyberpunks.filter((cyberpunk) => !cyberpunk.kia);
  const KIA = cyberpunks.filter((cyberpunk) => cyberpunk.kia);

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Container className="py-4">
            <Button
              variant="primary"
              className="mb-4"
              onClick={() => setShow(true)}
            >
              Create Goon
            </Button>

            <CyberpunksModal
              show={show}
              onHide={() => setShow(false)}
              form={form}
              onChange={handleChange}
              onSave={handleAdd}
            />

            <Cyberpunks
              cyberpunks={KIA}
              title="These Goons have been Flatlined!"
              deleteCyberpunk={handleDeleteCyberpunk}
              toggleKIA={handleToggleKIA}
              onEditImage={handleEditImage}
              onUpdateNotes={handleUpdateNotes}
              onChange={handleChange}
            />

            <Cyberpunks
              cyberpunks={available}
              title="Goons Ready for Action"
              deleteCyberpunk={handleDeleteCyberpunk}
              toggleKIA={handleToggleKIA}
              onEditImage={handleEditImage}
              onUpdateNotes={handleUpdateNotes}
              onChange={handleChange}
            />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
