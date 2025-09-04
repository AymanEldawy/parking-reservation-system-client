
import { expect, it, vi, describe } from 'vitest'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/pages/Login";
import { toast } from "react-toastify";


describe("Login Component", () => {
  const fnLogin = vi.fn();

  it("renders login form with default values", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Username")).toBe("superadmin");
    expect(screen.getByPlaceholderText("Password")).toBe("superpass");
    expect(screen.getByRole("button", { name: /login/i })).toBeDefined();
  });

  it("shows error toast on failed login", async () => {
    fnLogin.mockReturnValue({
      data: { status: "error", message: "Invalid credentials" },
    });

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fnLogin).toHaveBeenCalledWith({
        username: "superadmin",
        password: "superpass",
      });
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("does not show error toast on successful login", async () => {
    fnLogin.mockReturnValue({
      data: { status: "success", token: "abc123" },
    });

    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fnLogin).toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  it("shows validation error if username is empty", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeDefined();
    });
  });

  it("shows validation error if password is empty", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeDefined();
    });
  });
});