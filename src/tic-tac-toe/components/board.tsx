import { memo } from "react";
import { Square } from "./square";
import { GameDomainModel } from "../game.domain-model";

type Props = {
  onClick: (square: number) => void;
  squares: GameDomainModel.Squares;
  status: string;
};

export const Board = memo(function ({ onClick, squares, status }: Props) {
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => onClick(0)} />
        <Square value={squares[1]} onClick={() => onClick(1)} />
        <Square value={squares[2]} onClick={() => onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => onClick(3)} />
        <Square value={squares[4]} onClick={() => onClick(4)} />
        <Square value={squares[5]} onClick={() => onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => onClick(6)} />
        <Square value={squares[7]} onClick={() => onClick(7)} />
        <Square value={squares[8]} onClick={() => onClick(8)} />
      </div>
    </>
  );
});
