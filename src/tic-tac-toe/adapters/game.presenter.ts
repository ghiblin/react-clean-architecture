import { IGamePresenter, Input, Ouput } from "../ports/game-presenter.port";

export class GamePresenter implements IGamePresenter {
  format(input: Input): Ouput {
    const moves = input.history.map((_, move) => {
      return {
        move,
        description: move > 0 ? `Go to move #${move}` : "Go to game start",
      };
    });

    const status = input.winner
      ? input.winner === "draw"
        ? "Draw"
        : `Winner: ${input.winner}`
      : `Next player: ${input.xIsNext ? "X" : "O"}`;

    return {
      squares: input.history[input.step],
      status,
      moves,
    };
  }
}
