import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/components/atoms/Input";
import Button from "../../shared/components/atoms/Button";
import { signIn } from "../../features/auth/services";
import "../../styles/Auth.css";
import swoosh from "../../assets/nike-swoosh.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signin() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!identifier.trim()) {
      nextErrors.identifier = "Email or username is required";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const trimmedIdentifier = identifier.trim();
    const isEmail = EMAIL_REGEX.test(trimmedIdentifier);

    try {
      const response = await signIn({
        email: isEmail ? trimmedIdentifier : undefined,
        username: isEmail ? undefined : trimmedIdentifier,
        password,
      });

      const payload = {
        accessToken: response.accessToken ?? null,
        refreshToken: response.refreshToken ?? null,
        id: response.id ?? null,
        email: response.email ?? (isEmail ? trimmedIdentifier : null),
        username: response.username ?? (!isEmail ? trimmedIdentifier : null),
      };

      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem("nike_auth", JSON.stringify(payload));

      navigate("/", { replace: true });
    } catch (error) {
      setApiError(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <div className="brand">
          <img className="swoosh" src={swoosh} alt="Nike swoosh" />
          <div>
            <p className="brand-name">NIKE</p>
            <small>Member Access</small>
          </div>
        </div>

        <h1>Welcome back.</h1>

        <div className="auth-field">
          <label htmlFor="signin-identifier">Email or username</label>
          <Input
            id="signin-identifier"
            type="text"
            placeholder="you@example.com or yourusername"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={Boolean(errors.identifier)}
            autoComplete="username"
          />
          {errors.identifier && <p className="auth-error">{errors.identifier}</p>}
        </div>

        <div className="auth-field">
          <label htmlFor="signin-password">Password</label>
          <Input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            autoComplete="current-password"
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}
        </div>

        <div className="row row-between">
          <label className="check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Keep me signed in</span>
          </label>

          <a className="link" href="#" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        {apiError && <p className="auth-error auth-error-api">{apiError}</p>}

        <Button type="submit" fullWidth className="auth-signin-btn" disabled={isSubmitting} >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <p className="auth-footnote">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
