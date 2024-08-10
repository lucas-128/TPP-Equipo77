import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  mainMemoryId,
  aluRegistersId,
} from "../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../hooks/usePosition";

export const ControlToMainMemAddrBus = ({ id }) => {
  const animations = useSelector((state) => state.application.edgeAnimation);

  const edgeAnimationAluRegistersId = useMemo(
    () => animations.includes(aluRegistersId),
    [animations, aluRegistersId]
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
        }}
      />
      {edgeAnimationAluRegistersId && (
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
