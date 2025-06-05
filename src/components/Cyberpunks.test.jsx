import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cyberpunks from "./Cyberpunks";

describe("Cyberpunks Component", () => {
  const mockCyberpunk = {
    id: "1",
    name: "Test Goon",
    type: "Easy Goon",
    imageUrl: "test.jpg",
    stats: {
      skill: 8,
      initiative: 4,
      move: 5,
      health: 15,
      armorHead: 0,
      armorBody: 7,
    },
    weapon: "Light Melee Weapon",
    cyberware: ["Light Tattoo"],
    notes: "Test notes",
    kia: false,
  };

  const mockProps = {
    cyberpunks: [mockCyberpunk],
    title: "Test Title",
    deleteCyberpunk: vi.fn(),
    toggleKIA: vi.fn(),
    onEditImage: vi.fn(),
    onUpdateNotes: vi.fn(),
  };

  it("renders the title", () => {
    render(<Cyberpunks {...mockProps} />);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeDefined();
  });

  it("displays cyberpunk information", () => {
    render(<Cyberpunks {...mockProps} />);
    const nameElement = screen.getByText("Test Goon");
    const typeElement = screen.getByText("Easy Goon");
    expect(nameElement).toBeDefined();
    expect(typeElement).toBeDefined();
  });

  it("handles KIA toggle", () => {
    render(<Cyberpunks {...mockProps} />);
    const kiaButton = screen.getByText("Mark as KIA");
    fireEvent.click(kiaButton);
    expect(mockProps.toggleKIA).toHaveBeenCalledWith("1", true);
  });

  it("handles notes update", () => {
    render(<Cyberpunks {...mockProps} />);
    const notesInput = screen.getByPlaceholderText(
      "Add notes about this goon..."
    );
    fireEvent.change(notesInput, { target: { value: "New notes" } });
    expect(mockProps.onUpdateNotes).toHaveBeenCalledWith("1", "New notes");
  });
});
