import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
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
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);

      setError(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
      <a className="shell-brand" href="/"><span className="shell-mark">L</span><span><b>LexiBridge</b><small>LEGAL TRANSLATION</small></span></a>
      <p className="eyebrow">SECURE LEGAL WORKSPACE</p>
      <h1>Welcome back</h1>
      <p className="auth-intro">Sign in to continue to your document translations.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email" type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password" type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" disabled={submitting}>{submitting ? "Signing in…" : "Sign in"}</button>
      </form>

      {message && <p>{message}</p>}

      {error && <p className="auth-error" role="alert">{error}</p>}

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
      </section>
    </main>
  );
}

export default Login;
