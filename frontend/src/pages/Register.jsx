import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await registerUser({
        name,
        email,
        password,
      });

      setMessage("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);

      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
      <a className="shell-brand" href="/"><span className="shell-mark">L</span><span><b>LexiBridge</b><small>LEGAL TRANSLATION</small></span></a>
      <p className="eyebrow">SECURE LEGAL WORKSPACE</p>
      <h1>Create your account</h1>
      <p className="auth-intro">Set up a workspace for your legal translations.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-name">Name</label>

          <input
            id="register-name" type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="register-email">Email</label>

          <input
            id="register-email" type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="register-password">Password</label>

          <input
            id="register-password" type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={submitting}>{submitting ? "Creating account…" : "Create account"}</button>
      </form>

      {message && <p className="auth-success" role="status">{message}</p>}

      {error && <p className="auth-error" role="alert">{error}</p>}

      <p>
        Already have an account? <a href="/">Login</a>
      </p>
      </section>
    </main>
  );
}

export default Register;
