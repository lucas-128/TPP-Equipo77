import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  mainMemoryId,
  controlUnitMainMemAddrId,
} from "../../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";

export const ControlToMainMemAddrBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );
  const edgeAnimation = useMemo(
    () => animations.includes(controlUnitMainMemAddrId),
    [animations, controlUnitMainMemAddrId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: mainMemoryId,
  });

  // lo puse violeta para distinguir que es sólo de address
  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "var(--im-light-purple)",
          strokeWidth: 20,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
