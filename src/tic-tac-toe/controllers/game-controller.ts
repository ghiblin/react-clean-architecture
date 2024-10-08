import { useCallback, useMemo, useState } from "react";
import { GameDomainModel } from "../game.domain-model";
import { JumpTo } from "../use-cases/jump-to.use-case";
import { Play } from "../use-cases/play.use-case";
import { useDependencyContext } from "../../common/dependency-context";
import { IGamePresenter } from "../ports/game-presenter.port";

export function useGameController(
  defaultGame: GameDomainModel.GateState,
  presenter: IGamePresenter
) {
  const [currentGame, setCurrentGame] = useState(defaultGame);
  const { board } = useDependencyContext();

  const useCases = useMemo(
    () => ({ jumpTo: new JumpTo(board), play: new Play(board) }),
    [board]
  );

  const onPlay = useCallback(
    (square: number) => {
      useCases.play
        .execute({ step: currentGame.step, square })
        .then(setCurrentGame);
    },
    [currentGame.step, useCases.play]
  );

  const onJumpTo = useCallback(
    (step: number) => {
      useCases.jumpTo.execute({ step }).then(setCurrentGame);
    },
    [useCases.jumpTo]
  );

  const { squares, status, moves } = useMemo(
    () =>
      presenter.format({
        history: currentGame.history,
        step: currentGame.step,
        winner: currentGame.winner,
        xIsNext: currentGame.xIsNext,
      }),
    [currentGame, presenter]
  );

  return { squares, status, moves, onPlay, onJumpTo };
}
