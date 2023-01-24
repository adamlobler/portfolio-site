import React from "react";

type Props = {
  className?: string | "";
};

export const RotatedRectangle: React.FC<Props> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M23.8339 0L47.6678 23.8339L23.8339 47.6678L0 23.8339L23.8339 0Z" />
    </svg>
  );
};
