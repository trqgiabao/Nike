import Input from "../atoms/Input.jsx";
import "../../../styles/components/InputField.css";

export default function InputField({ label, placeholder, type }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}
