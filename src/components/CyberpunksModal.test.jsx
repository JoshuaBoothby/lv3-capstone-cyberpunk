import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CyberpunksModal from "./CyberpunksModal";

describe("CyberpunksModal Component", () => {
  const mockForm = {
    name: "",
    type: "",
    imageUrl: "",
    notes: "",
    cyberware: [],
    weapon: "",
  };

  const mockProps = {
    show: true,
    onHide: vi.fn(),
    form: mockForm,
    onChange: vi.fn(),
    onSave: vi.fn(),
  };

  it("handles name input change", () => {
    render(<CyberpunksModal {...mockProps} />);
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Test Goon" } });
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it("handles goon type selection", () => {
    render(<CyberpunksModal {...mockProps} />);
    const typeSelect = screen.getByLabelText("Goon Type");
    fireEvent.change(typeSelect, { target: { value: "Easy Goon" } });
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it("handles save button click", () => {
    render(<CyberpunksModal {...mockProps} />);
    const saveButton = screen.getByText("Save CyberGoon");
    fireEvent.click(saveButton);
    expect(mockProps.onSave).toHaveBeenCalled();
  });

  it("handles cancel button click", () => {
    render(<CyberpunksModal {...mockProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockProps.onHide).toHaveBeenCalled();
  });
});
