import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { useMemo } from "react";
import {
  aluId,
  registerAluTopId,
  registerAluBottomId,
  registersId,
} from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { Title } from "./styled";
import { toHexaPadStart } from "../../../interpreter/utils";
import { textAddressTitle, textDataTitle } from "../utils";

export const RegistersToALUBus = ({ id, data }) => {

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );


  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const color = useSelector((state) => state.application.execute.color);

  const animationDataTop = useMemo(
    () => animations.find((anim) => anim.id === registerAluTopId),
    [animations, registerAluTopId]
  );

  const animationDataBottom = useMemo(
    () => animations.find((anim) => anim.id === registerAluBottomId),
    [animations, registerAluBottomId]
  );

  const edgeAnimationAluTop = !!animationDataTop;
  const edgeAnimationAluBottom = !!animationDataBottom;

  const [edgePathTop, labelXTop, labelYTop] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: "top",
  });

  const [edgePathBottom, labelXBottom, labelYBottom] = usePosition({
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
          path={edgePathTop}
          interactionWidth={20}
          style={{
            stroke: "var(--im-gray-lighter)",
            strokeWidth: 30,
            filter: "url(#drop-shadow-top)",
          }}
        />
        <BaseEdge
          path={edgePathBottom}
          interactionWidth={20}
          style={{
            stroke: "var(--im-gray-lighter)",
            strokeWidth: 30,
            filter: "url(#drop-shadow-bottom)",
          }}
        />
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(0%, -180%) translate(${labelXTop}px,${labelYTop}px)`,
            }}
            className="nodrag nopan"
          >
            {edgeAnimationAluTop && (
              <Globe arrowPosition={"bottom"} color={color}>
                <div className="row">
                  <Title $color={color}>{textAddressTitle("Dirección (execute)", typeSimulation)}</Title>
                  {animationDataTop?.address}
                </div>
                <div className="row">
                  <Title $color={color}>{textDataTitle("Datos (execute)", typeSimulation)}</Title>
                  {animationDataTop?.data}
                </div>
              </Globe>
            )}
          </div>
        </EdgeLabelRenderer>
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(0%, 90%) translate(${labelXBottom}px,${labelYBottom}px)`,
            }}
            className="nodrag nopan"
          >
            {edgeAnimationAluBottom && (
              <Globe arrowPosition={"top"} color={color}>
                <div className="row">
                  <Title $color={color}>Dirección</Title>
                  {toHexaPadStart(animationDataBottom?.address)}
                </div>
                <div className="row">
                  <Title $color={color}>Datos</Title>
                  {animationDataBottom?.data}
                </div>
              </Globe>
            )}
          </div>
        </EdgeLabelRenderer>
        {edgeAnimationAluTop && (
          <BusAnimation edgePath={edgePathTop} id={id} color={color} />
        )}
        {edgeAnimationAluBottom && (
          <BusAnimation edgePath={edgePathBottom} id={id} color={color} />
        )}
      </g>
    </>
  );
};
