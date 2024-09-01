import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { mainMemControlUnitDataId } from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

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

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: source,
    targetComponentId: target,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(120, 10.769230769230772%, 74.50980392156863%)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -140%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeAnimation && (
            <Globe arrowPosition={"bottom"} title={"Datos"}>
              {instructionRegister}
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
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
