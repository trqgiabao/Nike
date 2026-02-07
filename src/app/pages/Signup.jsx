import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  emailSchema,
  oneTimeCodeSchema,
  emailOtpSchema,
  passwordSchema,
} from "../../validation/signupSchemas.js";
import { register as registerApi, verifyEmailOtp } from "../../features/auth/services.js";
import { useAuthStore } from "../../features/auth/authStore.js";
import "../../styles/pages/Signup.css";

const NIKE_LOGO = "/images/nike.png";
const RESEND_COOLDOWN = 30;

export default function Signup() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resendSeconds, setResendSeconds] = useState(0);
  const [apiError, setApiError] = useState("");

  const emailForm = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm({
    resolver: yupResolver(oneTimeCodeSchema),
    defaultValues: { code: "" },
  });

  const verifyOtpForm = useForm({
    resolver: yupResolver(emailOtpSchema),
    defaultValues: { code: "" },
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const onEmailSubmit = (data) => {
    setEmail(data.email);
    setStep(2);
  };

  const chooseOneTimeCode = () => {
    setResendSeconds(RESEND_COOLDOWN);
    setStep(3);
  };

  const choosePassword = () => {
    setStep(4);
  };

  const onCodeSubmit = (data) => {
    console.log("Signup with code:", { email, code: data.code });
  };

  const onVerifyCodeSubmit = async (data) => {
    setApiError("");
    try {
      const res = await verifyEmailOtp({ email, code: data.code });
      const hasTokens = res.accessToken && res.refreshToken;
      if (hasTokens) {
        setAuth({ accessToken: res.accessToken, refreshToken: res.refreshToken, id: res.id });
      }
      toast.success("Đăng ký thành công. Đang chuyển đến trang đăng nhập...");
      setTimeout(() => navigate("/signin", { replace: true }), 2000);
    } catch (err) {
      setApiError(err.message || "Invalid code. Please try again.");
    }
  };

  const onPasswordSubmit = async (data) => {
    setApiError("");
    try {
      const res = await registerApi({
        username: data.username,
        email,
        password: data.password,
      });
      const hasTokens = res.accessToken && res.refreshToken;
      if (hasTokens) {
        setAuth({ accessToken: res.accessToken, refreshToken: res.refreshToken, id: res.id });
        navigate("/", { replace: true });
      } else {
        setStep(5);
        setResendSeconds(RESEND_COOLDOWN);
        toast.info("Kiểm tra email để xác nhận tài khoản.");
      }
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    }
  };

  const resendCode = () => {
    setResendSeconds(RESEND_COOLDOWN);
  };

  useEffect(() => setApiError(""), [step]);
  useEffect(() => {
    if (step === 5) verifyOtpForm.reset({ code: "" });
  }, [step]);

  useEffect(() => {
    if ((step !== 3 && step !== 5) || resendSeconds <= 0) return;
    const t = setInterval(() => setResendSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [step, resendSeconds]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="nike-auth">
      <div className="nike-auth-logo-wrap">
        <Link to="/" className="nike-auth-logo">
          <img src={NIKE_LOGO} alt="Nike" className="nike-auth-logo-img" />
        </Link>
      </div>

      <div className="nike-auth-card">
        {step === 1 && (
          <>
            <h1 className="nike-auth-headline">
              Enter your email to join us or sign in.
            </h1>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="nike-auth-form">
              <div className="nike-auth-field">
                <label htmlFor="email">Email*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={`nike-auth-input ${emailForm.formState.errors.email ? "nike-auth-input-error" : ""}`}
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <span className="nike-auth-error">
                    {emailForm.formState.errors.email.message}
                  </span>
                )}
              </div>
              <p className="nike-auth-legal">
                By continuing, I agree to Nike's{" "}
                <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>.
              </p>
              <button
                type="submit"
                className="nike-auth-btn nike-auth-btn-primary"
                disabled={emailForm.formState.isSubmitting}
              >
                Continue
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="nike-auth-headline">How do you want to sign up?</h1>
            <p className="nike-auth-email-row">
              {email}{" "}
              <button
                type="button"
                className="nike-auth-edit"
                onClick={() => setStep(1)}
              >
                Edit
              </button>
            </p>
            <div className="nike-auth-form">
              <button
                type="button"
                className="nike-auth-btn nike-auth-btn-primary"
                onClick={chooseOneTimeCode}
              >
                Send one-time code to email
              </button>
              <button
                type="button"
                className="nike-auth-btn nike-auth-btn-secondary"
                onClick={choosePassword}
              >
                Use password
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="nike-auth-headline">
              Enter the 8-digit code sent to your email.
            </h1>
            <p className="nike-auth-email-row">
              {email}{" "}
              <button
                type="button"
                className="nike-auth-edit"
                onClick={() => setStep(1)}
              >
                Edit
              </button>
            </p>
            <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="nike-auth-form">
              <div className="nike-auth-field">
                <label htmlFor="code">8-digit code*</label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="00000000"
                  className={`nike-auth-input ${codeForm.formState.errors.code ? "nike-auth-input-error" : ""}`}
                  {...codeForm.register("code")}
                />
                {codeForm.formState.errors.code && (
                  <span className="nike-auth-error">
                    {codeForm.formState.errors.code.message}
                  </span>
                )}
              </div>
              <p className="nike-auth-resend">
                {resendSeconds > 0 ? (
                  <>Resend code in {resendSeconds}s</>
                ) : (
                  <button
                    type="button"
                    className="nike-auth-resend-btn"
                    onClick={resendCode}
                  >
                    Resend code
                  </button>
                )}
              </p>
              <button
                type="submit"
                className="nike-auth-btn nike-auth-btn-primary"
                disabled={codeForm.formState.isSubmitting}
              >
                Continue
              </button>
              <button
                type="button"
                className="nike-auth-btn nike-auth-btn-secondary"
                onClick={choosePassword}
              >
                Use password instead
              </button>
            </form>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="nike-auth-headline">
              Check your email for a verification code.
            </h1>
            <p className="nike-auth-email-row">
              We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
            </p>
            <form onSubmit={verifyOtpForm.handleSubmit(onVerifyCodeSubmit)} className="nike-auth-form">
              <div className="nike-auth-field">
                <label htmlFor="verify-code">Verification code (6 digits)*</label>
                <input
                  id="verify-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className={`nike-auth-input ${verifyOtpForm.formState.errors.code ? "nike-auth-input-error" : ""}`}
                  {...verifyOtpForm.register("code")}
                />
                {verifyOtpForm.formState.errors.code && (
                  <span className="nike-auth-error">
                    {verifyOtpForm.formState.errors.code.message}
                  </span>
                )}
              </div>
              {apiError && (
                <p className="nike-auth-error nike-auth-api-error">{apiError}</p>
              )}
              <p className="nike-auth-resend">
                {resendSeconds > 0 ? (
                  <>Resend code in {resendSeconds}s</>
                ) : (
                  <button
                    type="button"
                    className="nike-auth-resend-btn"
                    onClick={resendCode}
                  >
                    Resend code
                  </button>
                )}
              </p>
              <button
                type="submit"
                className="nike-auth-btn nike-auth-btn-primary"
                disabled={verifyOtpForm.formState.isSubmitting}
              >
                {verifyOtpForm.formState.isSubmitting ? "Verifying..." : "Verify"}
              </button>
            </form>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="nike-auth-headline">Create your account</h1>
            <p className="nike-auth-email-row">
              {email}{" "}
              <button
                type="button"
                className="nike-auth-edit"
                onClick={() => setStep(1)}
              >
                Edit
              </button>
            </p>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="nike-auth-form">
              <div className="nike-auth-field">
                <label htmlFor="username">Username*</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  autoComplete="username"
                  className={`nike-auth-input ${passwordForm.formState.errors.username ? "nike-auth-input-error" : ""}`}
                  {...passwordForm.register("username")}
                />
                {passwordForm.formState.errors.username && (
                  <span className="nike-auth-error">
                    {passwordForm.formState.errors.username.message}
                  </span>
                )}
              </div>
              <div className="nike-auth-field">
                <label htmlFor="password">Password*</label>
                <div className="nike-auth-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    className={`nike-auth-input ${passwordForm.formState.errors.password ? "nike-auth-input-error" : ""}`}
                    {...passwordForm.register("password")}
                  />
                  <button
                    type="button"
                    className="nike-auth-eye"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {passwordForm.formState.errors.password && (
                  <span className="nike-auth-error">
                    {passwordForm.formState.errors.password.message}
                  </span>
                )}
              </div>
              <div className="nike-auth-field">
                <label htmlFor="confirmPassword">Confirm password*</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`nike-auth-input ${passwordForm.formState.errors.confirmPassword ? "nike-auth-input-error" : ""}`}
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <span className="nike-auth-error">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {apiError && (
                <p className="nike-auth-error nike-auth-api-error">{apiError}</p>
              )}
              <button
                type="submit"
                className="nike-auth-btn nike-auth-btn-primary"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting ? "Creating..." : "Create account"}
              </button>
              <button
                type="button"
                className="nike-auth-btn nike-auth-btn-secondary"
                onClick={chooseOneTimeCode}
              >
                Use one-time code instead
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}