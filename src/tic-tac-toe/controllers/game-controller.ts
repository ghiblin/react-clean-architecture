import { useCallback, useMemo, useState } from "react";
import { GameDomainModel } from "../game.domain-model";
import { JumpTo } from "../use-cases/jump-to.use-case";
import { Play } from "../use-cases/play.use-case";
import { useDependencyContext } from "../../common/dependency-context";
import { IGamePresenter } from "../ports/game-presenter.port";
import { useMutation } from "@tanstack/react-query";

export function useJumpToMutation(
  onSuccess: (game: GameDomainModel.GateState) => void
) {
  const { board } = useDependencyContext();

  const jumpTo = useMemo(() => new JumpTo(board), [board]);

  const mutation = useMutation({
    mutationKey: ["jumpTo"],
    mutationFn: (step: number) => jumpTo.execute({ step }),
    onSuccess,
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
}

export function usePlayMutation(
  onSuccess: (game: GameDomainModel.GateState) => void
) {
  const { board } = useDependencyContext();

  const play = useMemo(() => new Play(board), [board]);

  const mutation = useMutation({
    mutationKey: ["play"],
    mutationFn: ({ step, square }: { step: number; square: number }) =>
      play.execute({ step, square }),
    onSuccess,
  });

  return {
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    isError: mutation.isError,
    mutate: mutation.mutate,
  };
}

export function useGameController(
  defaultGame: GameDomainModel.GateState,
  presenter: IGamePresenter
) {
  const [currentGame, setCurrentGame] = useState(defaultGame);

  const jumpTo = useJumpToMutation(setCurrentGame);
  const play = usePlayMutation(setCurrentGame);

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

  const onPlay = useCallback(
    (square: number) => {
      play.mutate({ step: currentGame.step, square });
    },
    [currentGame.step, play]
  );

  const onJumpTo = useCallback(
    (step: number) => {
      jumpTo.mutate(step);
    },
    [jumpTo]
  );

  return { squares, status, moves, onPlay, onJumpTo };
}
