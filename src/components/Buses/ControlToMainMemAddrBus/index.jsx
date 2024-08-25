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

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const address = useSelector((state) => state.application.fetch.address);

  const edgeAnimation = useMemo(
    () =>
      animations.includes(controlUnitMainMemAddrId) ||
      executeAnimations.includes(controlUnitMainMemAddrId),
    [animations, executeAnimations, controlUnitMainMemAddrId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: mainMemoryId,
  });

  // Rojo para distinguir que es sólo de address
  return (
    <g onClick={() => console.log(address)}>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(0, 50%, 65%)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && <BusAnimation edgePath={edgePath} id={id} />}
    </g>
  );
};
