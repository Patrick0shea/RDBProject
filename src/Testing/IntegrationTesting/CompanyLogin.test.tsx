import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CompanyLogin } from "../../components/pages/Login/CompanyLogin";
import { MemoryRouter } from "react-router-dom";

// Step 1: Create a mock function for navigate
const navigateMock = vi.fn();

// Step 2: Mock useNavigate BEFORE tests run
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock EmailField
vi.mock("../../components/forms/EmailField", () => ({
  EmailField: ({ value, onChange }: any) => (
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Email"
      data-testid="email"
    />
  ),
}));

// Mock PasswordField
vi.mock("../../components/forms/PasswordField", () => ({
  PasswordField: ({ value, onChange, placeholder }: any) => (
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      data-testid="password"
    />
  ),
}));

describe("CompanyLogin Integration Test", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fills out form and submits successfully", async () => {
    // Step 3: Mock both fetch calls
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ company_id: 123 })),
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify({ success: true })),
      } as any);

    render(
      <MemoryRouter>
        <CompanyLogin />
      </MemoryRouter>
    );

    // Fill in all fields
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your company name"), {
      target: { value: "Acme Inc." },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "pass1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "pass1234" },
    });

    fireEvent.change(screen.getByPlaceholderText("Number of available jobs"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Salary offered"), {
      target: { value: "80000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Describe the job role"), {
      target: { value: "Software Dev" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(navigateMock).toHaveBeenCalledWith("/company-dashboard");
    });
  });
});
