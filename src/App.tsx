import { useState } from "react";
import InputField from "./components/InputField";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Case 1: Disabled → if fields empty
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    // Case 2: Invalid → if wrong values
    if (email !== "test@example.com" || password !== "123456") {
      setError("Invalid email or password");
      return;
    }

    // Case 3: Loading
    setError("");
    setLoading(true);
    setSubmitted(false);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true); // success after few seconds
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02092B]">
      <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-lg shadow">
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

        {/* State showcase field */}
        <InputField
          label="Status"
          placeholder="Waiting for input..."
          disabled={!email || !password} // Disabled if empty
          invalid={!!error && !loading && !submitted} // Invalid if error
          errorMessage={error}
          loading={loading}
          value={
            loading
              ? "Fetching..."
              : submitted
              ? "✅ Done"
              : error
              ? ""
              : ""
          }
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading} // prevent re-click during loading
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
