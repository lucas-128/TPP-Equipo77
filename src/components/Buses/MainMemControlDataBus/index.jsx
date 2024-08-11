import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { aluRegistersId } from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation //Cambiar a que sea fetch
  );

  const edgeAnimation = useMemo(
    () => animations.includes(aluRegistersId),
    [animations, aluRegistersId]
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
