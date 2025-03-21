import React, { useState } from "react";
import "./UsernamePasswordForm.css";

interface FormData {
  username: string;
  password: string;
}

interface UsernamePasswordFormProps {
  onSubmit: (data: FormData) => Promise<string | null>;
}

export const UsernamePasswordForm: React.FC<UsernamePasswordFormProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setResult({
        type: "error",
        message: "Please fill in your username and password.",
      });
      return;
    }

    setIsPending(true);

    const submitResult = await props.onSubmit({ username, password });
    if (submitResult) {
      setResult({
        type: "error",
        message: submitResult,
      });
    } else {
      setResult({
        type: "success",
        message: "Login/Registration successful!",
      });
      setUsername("");
      setPassword("");
    }
    setIsPending(false);
  };

  return (
    <>
      {result && <p className={`message ${result.type}`}>{result.message}</p>}
      {isPending && <p className="message loading">Loading ...</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            disabled={isPending}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
          />
        </div>
        <div>
          <button type="submit" disabled={isPending}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default UsernamePasswordForm;
