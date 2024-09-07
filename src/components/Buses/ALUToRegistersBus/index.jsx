import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import {
  aluId,
  registersId,
  aluRegistersId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";

export const ALUToRegistersBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const color = useSelector((state) => state.application.execute.color);

  const edgeAnimation = useMemo(
    () => animations.find((anim) => anim.id === aluRegistersId),
    [animations, aluRegistersId]
  );
  const [edgePath, labelX, labelY] = usePosition({
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
          stroke: "var(--im-gray-lighter)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5)) ",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -140%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {true && (
            <Globe arrowPosition={"bottom"} title={"Datos"} color={color}>
              {/* <div className="row">
                <Title $color={color}>Dirección</Title>
                {animationData?.address}
              </div>
              <div className="row">
                <Title $color={color}>Datos</Title>
                {animationData?.data}
              </div> */}
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
      {edgeAnimation && (
        <BusAnimation edgePath={edgePath} id={id} color={color} />
      )}
    </g>
  );
};
