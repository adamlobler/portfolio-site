import React from "react";

type Props = {
  className?: string | "";
};

export const Cross: React.FC<Props> = (props) => {
  return (
    <svg
      width="41"
      height="40"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M40.957 4.02857L36.9285 0L20.957 15.9714L4.9856 0L0.957031 4.02857L16.9285 20L0.957031 35.9714L4.9856 40L20.957 24.0286L36.9285 40L40.957 35.9714L24.9856 20L40.957 4.02857Z" />
    </svg>
  );
};
