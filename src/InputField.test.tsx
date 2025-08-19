import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./components/InputField";

describe("InputField Component", () => {
  it("renders label and placeholder", () => {
    render(<InputField label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("disables input when disabled", () => {
    render(<InputField label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("marks input as invalid", () => {
    render(
      <InputField label="Email" invalid errorMessage="Invalid email" />
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    render(<InputField label="Loading" loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(<InputField label="Email" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  // Password toggle test
  it("toggles password visibility when clicking show/hide", () => {
    render(<InputField label="Password" type="password" />);
    const input = screen.getByLabelText("Password") as HTMLInputElement;

    // Initially password type
    expect(input.type).toBe("password");

    // Click "Show"
    fireEvent.click(screen.getByRole("button", { name: /show/i }));
    expect(input.type).toBe("text");

    // Click "Hide"
    fireEvent.click(screen.getByRole("button", { name: /hide/i }));
    expect(input.type).toBe("password");
  });
   
  //clear button test
  it("clears input when clear button is clicked", () => {
    const handleChange = vi.fn();
    render(
      <InputField label="Search" value="Hello" onChange={handleChange} />
    );

    const input = screen.getByLabelText("Search") as HTMLInputElement;
    expect(input.value).toBe("Hello");

    // Click clear button
    fireEvent.click(screen.getByRole("button", { name: /clear/i }));

    // Input should be empty
    expect(handleChange).toHaveBeenCalled();
  });
});
