import { render, screen } from "@testing-library/react";
import DataTable from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

test("renders table with data", () => {
  const data: User[] = [{ id: 1, name: "Alice", email: "alice@example.com", age: 24 }];
  const columns = [
    { key: "name", title: "Name", dataIndex: "name" },
    { key: "email", title: "Email", dataIndex: "email" },
  ];

  render(<DataTable data={data} columns={columns} />);

  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
});
