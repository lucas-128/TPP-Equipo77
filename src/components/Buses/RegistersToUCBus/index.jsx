import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  registersControlUnitId,
  registersId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BusAnimation } from "../BusAnimation";

export const RegistersToUCBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimation = useMemo(
    () => animations.includes(registersControlUnitId),
    [animations, registersControlUnitId]
  );

  const [edgePath] = usePosition({
    edgeId: registersControlUnitId,
    sourceComponentId: registersId,
    targetComponentId: controlUnitId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "var(--im-gray-lighter)",
          strokeWidth: 20,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
