import React from "react";

type Props = {
  className?: string | "";
};

export const Triangle: React.FC<Props> = (props) => {
  return (
    <svg
      width="42"
      height="36"
      viewBox="0 0 42 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M20.832 0L41.6166 36H0.0474224L20.832 0Z" />
    </svg>
  );
};
