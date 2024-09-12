import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import {
  controlUnitId,
  controlUnitCacheAddrBusId,
  cacheMemoryId,
} from "../../../containers/SimulatorSection/components";
import { useMemo } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";

export const ControlToCacheAddrBus = ({ id }) => {
  const fetchAddress = useSelector((state) => state.application.fetch.address);

  const executeAddress = "";

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const animationData = useMemo(() => {
    const combinedAnimations = [...animations, ...executeAnimations];
    return combinedAnimations.find(
      (anim) => anim.id === controlUnitCacheAddrBusId
    );
  }, [animations, executeAnimations]);

  const edgeAnimation = !!animationData;

  const color = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === controlUnitCacheAddrBusId
    )
      ? executeColor
      : fetchColor;
  }, [executeAnimations, fetchColor, executeColor]);

  const address = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === controlUnitCacheAddrBusId
    )
      ? executeAddress
      : fetchAddress;
  }, [executeAnimations, fetchAddress, executeAddress]);

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: cacheMemoryId,
  });

  // Roja para distinguir que es sólo de address
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
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(30px, -30px) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeAnimation && (
            <Globe arrowPosition={"left"} title={"Dirección"} color={color}>
              {animationData.address}
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
      {edgeAnimation && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={color}
          reverse={animationData.reverse}
        />
      )}
    </g>
  );
};
