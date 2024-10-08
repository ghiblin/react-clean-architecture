import { Executable } from "../../common/use-case";
import { StepDoesNotExistError } from "../errors/step-does-not-exist.error";
import { GameDomainModel } from "../game.domain-model";
import { IBoardRepository } from "../ports/board-repository.port";

type Input = {
  step: number;
};

type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class JumpTo implements Executable<Input, Output> {
  constructor(private readonly boardRepository: IBoardRepository) {}

  async execute({ step }: Input): Promise<Output> {
    const history = await this.boardRepository.findHistory();
    const board = history[step];

    if (!board) {
      throw new StepDoesNotExistError();
    }

    return {
      history: history.map((board) => board.squares),
      winner: board.calculateWinner(),
      xIsNext: board.xIsNext,
      step,
    };
  }
}
