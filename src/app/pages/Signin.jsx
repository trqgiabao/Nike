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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email là bắt buộc";
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Email không đúng định dạng";
    }

    if (!password) {
      nextErrors.password = "Password là bắt buộc";
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

    try {
      const response = await signIn({ email: email.trim(), password });
      const payload = {
        accessToken: response.accessToken ?? null,
        refreshToken: response.refreshToken ?? null,
        id: response.id ?? null,
        email: response.email ?? email.trim(),
      };

      const storage = remember ? window.localStorage : window.sessionStorage;
      storage.setItem("nike_auth", JSON.stringify(payload));

      navigate("/", { replace: true });
    } catch (error) {
      setApiError(error.message || "Đăng nhập thất bại, vui lòng thử lại.");
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
          <label htmlFor="signin-email">Email</label>
          <Input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <p className="auth-error">{errors.email}</p>}
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

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <p className="auth-footnote">
          Chưa có tài khoản? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
