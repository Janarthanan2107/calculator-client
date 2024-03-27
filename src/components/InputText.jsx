import React from "react";

const InputText = ({
  type,
  value,
  onChange,
  name,
  id,
  style,
  className,
  placeholder,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      style={style}
      className={className}
      placeholder={placeholder}
    />
  );
};

export default InputText;
