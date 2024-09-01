import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import {
  controlUnitId,
  mainMemoryId,
  controlUnitMainMemAddrId,
} from "../../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";

export const ControlToMainMemAddrBus = ({ id }) => {
  const address = useSelector((state) => state.application.fetch.address);
  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () =>
      animations.includes(controlUnitMainMemAddrId) ||
      executeAnimations.includes(controlUnitMainMemAddrId),
    [animations, executeAnimations, controlUnitMainMemAddrId]
  );

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: mainMemoryId,
  });

  return (
    <g onClick={() => console.log(address)}>
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
            transform: `translate(-50%, 40%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeAnimation && (
            <Globe arrowPosition={"top"} title={"Dirección"}>
              {address}
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
