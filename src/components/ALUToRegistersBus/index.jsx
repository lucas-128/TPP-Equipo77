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
            path={edgePath}
            style={{
              stroke: "var(--im-secondary-hover)",
            }}
          />
          <g>
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                width={15}
                height={5}
                fill={"var(--im-primary-hover)"}
                className="stripe"
                x={-5}
                y={-2.5}
              >
                <animateMotion
                  dur="9s"
                  repeatCount="indefinite"
                  path={edgePath}
                  rotate="auto"
                  begin={`${Math.floor(i / 3) * 3 + 0.2 * i}s`}
                />
              </rect>
            ))}
          </g>
        </>
      )}
    </g>
  );
};
