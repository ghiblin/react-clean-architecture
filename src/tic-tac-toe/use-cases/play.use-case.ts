import { Executable } from "../../common/use-case";
import { Board } from "../entities/board.entity";
import { CellAlreadyTakenError } from "../errors/call-already-taken.error";
import { StepDoesNotExistError } from "../errors/step-does-not-exist.error";
import { GameDomainModel } from "../game.domain-model";
import { IBoardRepository } from "../ports/board-repository.port";

export type Input = {
  square: number;
  step: number;
};

export type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class Play implements Executable<Input, Output> {
  constructor(private readonly boardRepository: IBoardRepository) {}

  async execute({ square, step }: Input): Promise<Output> {
    const history = await this.boardRepository.findHistory();
    const currentBoard = history[step];

    if (!currentBoard) {
      throw new StepDoesNotExistError();
    }

    const xIsNext = currentBoard.xIsNext;
    const winner = currentBoard.calculateWinner();

    if (winner) {
      return {
        winner,
        history: history.map((board) => board.squares),
        xIsNext,
        step,
      };
    }

    if (currentBoard.squares[square]) {
      throw new CellAlreadyTakenError();
    }

    const board = new Board({
      squares: currentBoard.squares.slice() as GameDomainModel.Squares,
    });

    board.squares[square] = xIsNext
      ? GameDomainModel.Square.X
      : GameDomainModel.Square.O;

    this.boardRepository.setHistory([...history.slice(0, step + 1), board]);

    return {
      history: [
        ...history.slice(0, step + 1).map((board) => board.squares),
        board.squares,
      ],
      winner: board.calculateWinner(),
      xIsNext: board.xIsNext,
      step: step + 1,
    };
  }
}
