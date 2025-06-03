import { render, screen, fireEvent } from "@testing-library/react";
import CompanyHomePage from "../../components/pages/HomePages/CompanyHomePage";
import { vi, describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

describe("CompanyHomePage (Vitest)", () => {
  it("renders available companies", () => {
    render(<CompanyHomePage />);
    const companies = screen.getAllByTestId("company-item");
    expect(companies.length).toBeGreaterThan(0);
    expect(companies.some(item => item.textContent?.includes("Amazon Web Services"))).toBe(true);
  });

  it("moves a company to shortlist on drop", () => {
    render(<CompanyHomePage />);
    const items = screen.getAllByTestId("company-item");
    const amazon = items.find(item => item.textContent?.includes("Amazon Web Services"));
    expect(amazon).toBeDefined();

    const dropZone = screen.getByTestId("shortlist-drop-zone");

    fireEvent.dragStart(amazon!);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);

    expect(dropZone.textContent?.includes("Amazon Web Services")).toBe(true);
  });

  it("removes a company from shortlist", () => {
    render(<CompanyHomePage />);
    const dropZone = screen.getByTestId("shortlist-drop-zone");

    const items = screen.getAllByTestId("company-item");
    const amazon = items.find(item =>
      item.textContent?.includes("Amazon Web Services")
    );
    expect(amazon).toBeDefined();

    // Move it to shortlist
    fireEvent.dragStart(amazon!);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);
    expect(dropZone.textContent?.includes("Amazon Web Services")).toBe(true);

    // Open dropdown
    const toggle = screen.getByTestId("toggle-1-Amazon-Web-Services");
    fireEvent.click(toggle);

    // Remove it
    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);

    expect(dropZone.textContent?.includes("Amazon Web Services")).toBe(false);
  });

  it("shows submit button when all companies are shortlisted", () => {
    render(<CompanyHomePage />);
    const dropZone = screen.getByTestId("shortlist-drop-zone");

    const companies = screen.getAllByTestId("company-item");
    companies.forEach(company => {
      fireEvent.dragStart(company);
      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone);
    });

    const submitButton = screen.getByRole("button", { name: "Submit Rankings" });
    expect(submitButton).not.toBeNull();
  });

  it("calls alert when submitted", () => {
    render(<CompanyHomePage />);
    const dropZone = screen.getByTestId("shortlist-drop-zone");

    const companies = screen.getAllByTestId("company-item");
    companies.forEach(company => {
      fireEvent.dragStart(company);
      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone);
    });

    const submitButton = screen.getByRole("button", { name: "Submit Rankings" });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Submitted! Check console for result.");
  });
});
