import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  aluId,
  registerAluTopId,
  registersId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const RegistersToALUBus = ({ id, data }) => {
  const edgeAnimationAluTop = useSelector(
    (state) => state.application.edgeAnimation.registerAluTop
  );

  const edgeAnimationAluBottom = useSelector(
    (state) => state.application.edgeAnimation.registerAluBottom
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: data.position,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          zIndex: -1,
          stroke: "grey",
          strokeWidth: 20,
        }}
      />
      {edgeAnimationAluTop && edgeAnimationAluBottom && (
        <>
          <BaseEdge
            path={edgePath}
            style={{
              stroke: "var(--im-secondary-hover)",
              animation: "dashdraw 0.5s linear infinite",
            }}
          />
          <g>
            {[...Array(6)].map((_, i) => (
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
                  dur="4s"
                  repeatCount="indefinite"
                  path={edgePath}
                  rotate="auto"
                  begin={`${1 + 0.3 * i + (i >= 3 ? 1 : 0)}s`}
                />
              </rect>
            ))}
          </g>
        </>
      )}
    </g>
  );
};