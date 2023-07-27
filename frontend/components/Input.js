export default function Input({
  type = "text",
  name,
  placeholder,
  extraClass,
  required = false,
  border = "",
  label = "",
  onChange,
  value,
  readOnly = false,
}) {
  return (
    <input
      type={type}
      readOnly={readOnly}
      className={`${
        border !== "" ? border : "border-2 border-gray-500"
      } py-2 px-4 outline-none ${extraClass}`}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      value={value}
      aria-label={label}
    />
  );
}
