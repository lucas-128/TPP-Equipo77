import { useSelector } from "react-redux";
import { BaseEdge } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { useMemo } from "react";
import {
  aluId,
  registerAluTopId,
  registerAluBottomId,
  registersId,
} from "../../../containers/SimulatorSection/components";

export const RegistersToALUBus = ({ id, data }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const edgeAnimationAluBottom = useMemo(
    () => animations.includes(registerAluTopId),
    [animations, registerAluTopId]
  );

  const edgeAnimationAluTop = useMemo(
    () => animations.includes(registerAluBottomId),
    [animations, registerAluBottomId]
  );

  const [edgePath] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: "top",
  });

  const [secondEdgePath] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: "bottom",
  });

  return (
    <>
      <defs>
        {/* Filtro para la arista inferior */}
        <filter
          id="drop-shadow-bottom"
          x="-10%"
          y="0%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="-2"
            dy="-2"
            stdDeviation="4"
            floodColor="rgba(0, 0, 0, 0.5)"
          />
        </filter>

        {/* Filtro para la arista superior */}
        <filter
          id="drop-shadow-top"
          x="-20%"
          y="-50%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="-2"
            dy="-2"
            stdDeviation="6"
            floodColor="rgba(0, 0, 0, 0.5)"
          />
        </filter>
      </defs>

      <g>
        {/* Background Edges */}
        <BaseEdge
          path={edgePath}
          interactionWidth={20}
          style={{
            stroke: "grey",
            strokeWidth: 20,
            filter: "url(#drop-shadow-top)",
          }}
        />
        <BaseEdge
          path={secondEdgePath}
          interactionWidth={20}
          style={{
            stroke: "grey",
            strokeWidth: 20,
            filter: "url(#drop-shadow-bottom)",
          }}
        />
        {edgeAnimationAluTop && edgeAnimationAluBottom && (
          <>
            <path
              d={edgePath}
              stroke="black"
              strokeWidth={4}
              strokeDasharray="15,15"
              strokeLinecap="round"
              fill="none"
              style={{
                animation: "dash 20s linear infinite reverse",
              }}
            />
            <path
              d={secondEdgePath}
              stroke="black"
              strokeWidth={4}
              strokeDasharray="15,15"
              strokeLinecap="round"
              fill="none"
              style={{
                animation: "dash 20s linear infinite reverse",
              }}
            />
          </>
        )}
      </g>
    </>
  );
};
