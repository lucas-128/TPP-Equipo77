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

  const animationData = useMemo(() => {
    const combinedAnimations = [...animations, ...executeAnimations];
    return combinedAnimations.find(
      (anim) => anim.id === mainMemControlUnitDataId
    );
  }, [animations, executeAnimations, mainMemControlUnitDataId]);

  const edgeAnimation = !!animationData;

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
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationData.reverse}
        />
      )}
    </g>
  );
};
