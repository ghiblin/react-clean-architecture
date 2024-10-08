import { GamePresenter } from "./adapters/game.presenter";
import { Board } from "./components/board";
import { useGameController } from "./controllers/game-controller";
import { GameDomainModel } from "./game.domain-model";
import "./app.css";

type Props = {
  game: GameDomainModel.GateState;
};

const presenter = new GamePresenter();

export function Game({ game }: Props) {
  const controller = useGameController(game, presenter);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={controller.squares}
          onClick={controller.onPlay}
          status={controller.status}
        />
      </div>
      <div className="game-info">
        <ol>
          {controller.moves.map(({ move, description }) => (
            <li key={move}>
              <button onClick={() => controller.onJumpTo(move)}>
                {description}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
