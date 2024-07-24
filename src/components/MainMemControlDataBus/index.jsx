import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import {
  controlUnitId,
  mainMemoryId,
} from "../../containers/SimulatorSection/components";
import { usePosition } from "../../hooks/usePosition";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const edgeAnimation = useSelector(
    (state) => state.application.edgeAnimation.aluRegisters
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: source,
    targetComponentId: target,
  });
  
  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: 'gray',
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
