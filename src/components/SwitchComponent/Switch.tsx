import { useTheme } from "../../context/ThemeContext";

export default function Switch({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  const isChecked = theme === "dark";

  return (
    <div
      className={`form-check form-switch d-flex align-items-center ${className}`}
    >
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={isChecked}
        onChange={toggleTheme}
      />
      <label className="form-check-label ms-2" htmlFor="flexSwitchCheckChecked">
        {isChecked ? "Dark" : "Light"}
      </label>
    </div>
  );
}
