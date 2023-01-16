import React from "react";

type Props = {
  type?: "primary" | "secondary";
  text?: string;
};

const Button: React.FC<Props> = (props) => {
  const { type = "primary", text } = props;
  const className =
    type === "primary"
      ? "bg-primary-500 text-button  hover:bg-primary-600 text-white py-4 px-6 rounded-sm"
      : "bg-transparent text-button hover:bg-gray-50 py-4 px-6 border border-black hover:border-transparent rounded-sm";
  return <button className={`${className}`}>{text || "Default"}</button>;
};

export default Button;
