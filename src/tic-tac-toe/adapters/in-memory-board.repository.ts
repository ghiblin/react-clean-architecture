import { Board } from "../entities/board.entity";
import { GameDomainModel } from "../game.domain-model";
import { IBoardRepository } from "../ports/board-repository.port";

export class InMemoryBoardRepository implements IBoardRepository {
  private history: GameDomainModel.Squares[] = [];

  findHistory(): Promise<Board[]> {
    return Promise.resolve(
      this.history.map((squares) => new Board({ squares }))
    );
  }

  async setHistory(boards: Board[]): Promise<void> {
    this.history = boards.map((board) => board.squares);
  }
}
