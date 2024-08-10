import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge } from "reactflow";
import {
  aluId,
  registersId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const ALUToRegistersBus = ({ id }) => {
  const animations = useSelector((state) => state.application.edgeAnimation);

  const edgeAnimation = useMemo(
    () => animations.includes(aluRegistersId),
    [animations, aluRegistersId]
  );
  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: aluId,
    targetComponentId: registersId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "grey",
          strokeWidth: 20,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && (
        <>
          <BaseEdge
            id={id}
            path={edgePath}
            style={{
              stroke: "none",
            }}
          />
          <g>
            <path
              d={edgePath}
              stroke="var(--im-primary-hover)"
              strokeWidth={4}
              strokeDasharray="15,15"
              strokeDashoffset="0"
              strokeLinecap="round"
              fill="none"
              style={{
                animation: "dash 15s linear infinite reverse",
              }}
            />
          </g>
        </>
      )}
    </g>
  );
};
