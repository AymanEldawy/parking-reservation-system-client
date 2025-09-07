import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import EmployeeTable from "./EmployeeTable";
import type { EmployeeType } from "@/types/user.type";
import { useUserStore } from "@/store/userStore";


vi.mock("@/store/userStore", () => {
  const deleteUser = vi.fn();
  return {
    useUserStore: vi.fn(() => ({
      deleteUser,
    })),
  };
});

describe("Testing EmployeeTable component", () => {
  const deleteUser = useUserStore().deleteUser;
  const handleUpdateUser = vi.fn();
  const users: EmployeeType[] = [
    { id: "1", name: "John Doe", role: "Developer", status: "active" },
    { id: "2", name: "Jane Smith", role: "Manager", status: "inactive" },
  ];

  beforeEach(() => {
    handleUpdateUser.mockClear();
    render(<EmployeeTable handleUpdateUser={handleUpdateUser} users={users} />);
  });

  it("calls handleUpdateUser when edit button is clicked", () => {
    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);
    expect(handleUpdateUser).toHaveBeenCalledWith(
      expect.objectContaining(users[0])
    );
  });

  it("calls deleteUser with correct user ID when delete button is clicked", () => {
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]); 
    expect(deleteUser).toHaveBeenCalledWith(users[0].id);
  });

});