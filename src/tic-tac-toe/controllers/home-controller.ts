import { useMemo } from "react";
import { useDependencyContext } from "../../common/dependency-context";
import { GameDomainModel } from "../game.domain-model";
import { Initialize } from "../use-cases/initialize.use-case";
import { useQuery } from "@tanstack/react-query";

export function useInitializeQuery() {
  const { board } = useDependencyContext();

  const initialize = useMemo(() => {
    return new Initialize(board);
  }, [board]);

  const query = useQuery<GameDomainModel.GateState>({
    queryKey: ["initialize"],
    queryFn: () => initialize.execute(),
  });

  return {
    data: query.data,
    error: query.error,
    isPending: query.isPending,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
}

export function useHomeController() {
  const initialize = useInitializeQuery();

  return { initialize };
}
