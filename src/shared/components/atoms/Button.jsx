import "../../../styles/components/Button.css";

export default function Button({ children, variant = "primary" }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}