import Input from "../../shared/components/atoms/Input";
import Button from "../../shared/components/atoms/Button";
import "../../styles/components/Auth.css";
import swoosh from "../../assets/nike-swoosh.png";

export default function NikeAuth() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand">
          <img className="swoosh" src={swoosh} alt="Nike swoosh" />
          <div>
            <p className="brand-name">NIKE</p>
            <small>Member Access</small>
          </div>
        </div>

        <h1>Welcome back.</h1>

        <Input label="Email" type="email" />
        <Input label="Password" type="password" />

        {/* Keep me signed in */}
        <div className="row row-between">
          <label className="check">
            <input type="checkbox" />
            <span>Keep me signed in</span>
          </label>

          <a className="link" href="#">
            Forgot password?
          </a>
        </div>

        <Button text="Sign In" />
      </div>
    </main>
  );
}
