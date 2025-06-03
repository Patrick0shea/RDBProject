import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorBoundary from "../../components/shared/ErrorBoundary";
import "@testing-library/jest-dom";

// Helper component that throws an error
function Bomb(): React.ReactElement | null {
  throw new Error("Boom!");
  // Returning null to satisfy the return type, though this line is never reached
  return null;
}

describe("ErrorBoundary integration", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>All good</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("catches error and displays fallback UI", () => {
    // Suppress console.error for cleaner test output
    const consoleError = console.error;
    console.error = vi.fn();

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Boom!")).toBeInTheDocument();

    // Restore console.error
    console.error = consoleError;
  });
});
