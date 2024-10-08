import { useEffect, useState } from "react";
import { useDependencyContext } from "../../common/dependency-context";
import { GameDomainModel } from "../game.domain-model";
import { Initialize } from "../use-cases/initialize.use-case";

type InitializeState = { isPending: boolean } & (
  | {
      isSuccess: false;
      data: null;
    }
  | {
      isSuccess: true;
      data: GameDomainModel.GateState;
    }
);

export function useHomeController() {
  const { board } = useDependencyContext();

  const [initialize, setInitialize] = useState<InitializeState>({
    isPending: true,
    isSuccess: false,
    data: null,
  });

  useEffect(() => {
    new Initialize(board).execute().then((game) => {
      setInitialize({
        isPending: false,
        isSuccess: true,
        data: game,
      });
    });
  }, [board]);

  return { initialize };
}
