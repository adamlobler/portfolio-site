import React from "react";

type Props = {
  className?: string | "";
};

export const Circle: React.FC<Props> = (props) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <circle cx="18.1592" cy="18.1592" r="18.1592" />
    </svg>
  );
};
