import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  registersControlUnitId,
  registersId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const RegistersToUCBus = () => {
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
        }}
      />
    </g>
  );
};
