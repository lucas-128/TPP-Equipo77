import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { mainMemControlUnitDataId } from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () =>
      animations.includes(mainMemControlUnitDataId) ||
      executeAnimations.includes(mainMemControlUnitDataId),
    [animations, executeAnimations, mainMemControlUnitDataId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: source,
    targetComponentId: target,
  });

  // Verde para distinguir que es sólo de datos
  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(120, 50%, 70%)",
          strokeWidth: 20,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
