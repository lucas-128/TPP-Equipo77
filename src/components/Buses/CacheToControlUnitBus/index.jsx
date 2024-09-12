import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import {
  cacheMemoryId,
  controlUnitId,
  controlUnitCacheId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";

export const CacheToControlUnitBus = ({ id }) => {
  // const fetchData = useSelector(
  //   (state) => state.application.fetch.instructionRegister
  // );
  const executeData = "";

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const animationData = useMemo(() => {
    const combinedAnimations = [...animations, ...executeAnimations];
    return combinedAnimations.find((anim) => anim.id === controlUnitCacheId);
  }, [animations, executeAnimations, controlUnitCacheId]);

  const color = useMemo(() => {
    return executeAnimations.find((anim) => anim.id === controlUnitCacheId)
      ? executeColor
      : fetchColor;
  }, [executeAnimations, fetchColor, executeColor]);

  // const data = useMemo(() => {
  //   return executeAnimations.find((anim) => anim.id === controlUnitCacheId)
  //     ? executeData
  //     : fetchData;
  // }, [executeAnimations, fetchData, executeData]);

  const edgeAnimation = !!animationData;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: cacheMemoryId,
    targetComponentId: controlUnitId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "hsl(120, 10.769230769230772%, 74.50980392156863%)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      {edgeAnimation && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={color}
          reverse={animationData.reverse}
        />
      )}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-140%, -30px) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeAnimation && (
            <Globe arrowPosition={"right"} title={"Datos"} color={color}>
              {animationData.data}
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
    </g>
  );
};
