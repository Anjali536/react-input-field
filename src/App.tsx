import { useState } from "react";
import InputField from "./components/InputField";
import DataTable, { type Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    if (email !== "test@example.com" || password !== "123456") {
      setError("Invalid email or password");
      return;
    }

    setError("");
    setLoading(true);
    setSubmitted(false);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<User[]>([
    { id: 1, name: "Alice", email: "alice@example.com", age: 24 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 29 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 32 },
  ]);

  const columns: Column<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  const simulateLoading = () => {
    setTableLoading(true);
    setTableData([]);
    setTimeout(() => {
      setTableData([
        { id: 1, name: "Alice", email: "alice@example.com", age: 24 },
        { id: 2, name: "Bob", email: "bob@example.com", age: 29 },
        { id: 3, name: "Charlie", email: "charlie@example.com", age: 32 },
      ]);
      setTableLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#02092B] p-10 space-y-12">
      {/* InputField Demo */}
      <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">InputField Demo</h2>
        <InputField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        <InputField
          label="Status"
          placeholder="Waiting for input..."
          disabled={!email || !password}
          invalid={!!error && !loading && !submitted}
          errorMessage={error}
          loading={loading}
          value={loading ? "Fetching..." : submitted ? "✅ Done" : error ? "" : ""}
        />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          Submit
        </button>
      </div>

      {/* DataTable Demo */}
      <div className="w-full max-w-4xl p-10 bg-white rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold mb-4">DataTable Demo</h2>

        <div className="flex space-x-4 mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={simulateLoading}
          >
            Load Data
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setTableData([])}
          >
            Clear Data (Empty)
          </button>
        </div>

        <DataTable<User>
          data={tableData}
          columns={columns}
          loading={tableLoading}
          selectable
          onRowSelect={(rows) => console.log("Selected rows:", rows)}
        />
      </div>
    </div>
  );
}

export default App;
