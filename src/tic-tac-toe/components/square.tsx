import { memo } from "react";

type Props = {
  value: string;
  onClick: () => void;
};

export const Square = memo(function ({ value, onClick }: Props) {
  return (
    <button role="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
});
