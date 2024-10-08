import { useHomeController } from "./controllers/home-controller";
import { Game } from "./game";

export function Home() {
  const controller = useHomeController();

  if (controller.initialize.isPending) {
    return <div>Loading</div>;
  }

  if (controller.initialize.isSuccess) {
    return <Game game={controller.initialize.data} />;
  }
}
