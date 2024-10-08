import { Entity } from "../../common/entity";
import { GameDomainModel } from "../game.domain-model";

export class Board extends Entity<GameDomainModel.Board> {
  get squares(): GameDomainModel.Squares {
    return this._data.squares;
  }

  get step() {
    return this.squares.filter((square) => !!square).length;
  }

  get xIsNext() {
    return this.step % 2 === 0;
  }

  calculateWinner(): GameDomainModel.Winner {
    const lines: [number, number, number][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0, length = lines.length; i < length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[c] === this.squares[a]
      ) {
        return this.squares[a] as GameDomainModel.Player;
      }
    }

    if (this.squares.every((square) => !!square)) return "draw" as const;

    return null;
  }
}
