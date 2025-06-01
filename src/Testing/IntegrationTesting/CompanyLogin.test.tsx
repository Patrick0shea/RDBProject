import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CompanyLogin } from "../../components/pages/Login/CompanyLogin";
import { BrowserRouter } from "react-router-dom";

// Mocks
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock EmailField and PasswordField
vi.mock("../../../forms/EmailField", () => ({
  EmailField: ({ value, onChange, ...props }: any) => (
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  ),
}));

vi.mock("../../../forms/PasswordField", () => ({
  PasswordField: ({ value, onChange, ...props }: any) => (
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  ),
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("CompanyLogin (Vite/Vitest)", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.stubGlobal("alert", vi.fn());
    vi.stubGlobal("localStorage", {
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required fields", () => {
    renderWithRouter(<CompanyLogin />);

    expect(screen.getByText("Create Company Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your company name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Salary offered")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe the job role")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Re-enter your password")).toBeInTheDocument();
  });

  it("alerts on missing first or last name", async () => {
    renderWithRouter(<CompanyLogin />);
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("First Name and Last Name are required.");
    });
  });

  it("alerts when passwords do not match", async () => {
    renderWithRouter(<CompanyLogin />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your company name"), {
      target: { value: "OpenAI" },
    });
    fireEvent.change(screen.getByPlaceholderText("Salary offered"), {
      target: { value: "100000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Describe the job role"), {
      target: { value: "AI Engineer role" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getAllByRole("textbox", { name: /password/i })[0], {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Passwords do not match.");
    });
  });

  it("sends two fetch requests on valid submission", async () => {
    const userResponse = {
      company_id: 42,
    };

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(userResponse),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify({}),
      });

    renderWithRouter(<CompanyLogin />);

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your company name"), {
      target: { value: "TechCorp" },
    });
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: 5 },
    });
    fireEvent.change(screen.getByPlaceholderText("Salary offered"), {
      target: { value: "90000" },
    });
    fireEvent.change(screen.getByPlaceholderText("Describe the job role"), {
      target: { value: "Frontend Developer" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getAllByRole("textbox", { name: /password/i })[0], {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/register"), expect.any(Object));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/create-residency"), expect.any(Object));
    });
  });
});
