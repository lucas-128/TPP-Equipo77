import { useSelector } from "react-redux";
import {
  BaseEdge,
  getSmoothStepPath,
  getStraightPath,
  Position,
} from "reactflow";
import {
  cacheMemoryId,
  registersId,
} from "../../containers/SimulatorSection/components";

export const RegistersCacheBus = () => {
  const nodes = useSelector((state) => state.application.nodes);
  const registersHeight = document.getElementById(registersId)?.offsetHeight;
  const cacheMemHeight = document.getElementById(cacheMemoryId)?.offsetHeight;

  const registersWidth = document.getElementById(registersId)?.offsetWidth;
  const cacheMemWidth = document.getElementById(cacheMemoryId)?.offsetWidth;

  const registersPosition = nodes.find(
    (node) => node.id === registersId
  ).position;
  const cacheMemPosition = nodes.find(
    (node) => node.id === cacheMemoryId
  ).position;

  const [edgePath] = getSmoothStepPath({
    sourceX: registersPosition.x + registersWidth / 2,
    sourceY: registersPosition.y + registersHeight,
    targetX: cacheMemPosition.x + cacheMemWidth / 2,
    targetY: cacheMemPosition.y + cacheMemHeight,
    offset: 50,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Bottom,
  });

  return (
    <>
      <BaseEdge
        id={"registers-cache"}
        path={edgePath}
        style={{
          // use 0.2s to speed up the animation
          // animation: "dashdraw 0.5s linear infinite",
          // strokeDasharray: 6,
          strokeWidth: 20,

        }}
      />
    </>
  );
};
