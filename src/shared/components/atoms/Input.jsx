import "../../../styles/components/Input.css";

export default function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input"
    />
  );
}
