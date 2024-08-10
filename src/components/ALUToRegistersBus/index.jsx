import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge } from "reactflow";
import {
  aluId,
  registersId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const ALUToRegistersBus = ({ id }) => {
  const animations = useSelector((state) => state.application.execute.edgeAnimation);

  const edgeAnimation = useMemo(
    () => animations.includes(registersId),
    [animations, registersId]
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
                  begin={`${Math.floor(i / 3) * 3 + 0.2 * i}s`} //Acomodar tiempos para que quede bien
                />
              </rect>
            ))}
          </g>
        </>
      )}
    </g>
  );
};
