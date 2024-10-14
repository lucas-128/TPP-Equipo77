import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import {
  cacheMemoryId,
  controlUnitId,
  controlUnitCacheId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { textDataTitle } from "../utils";
import { convertValue } from "../../../interpreter/utils";

export const CacheToControlUnitBus = ({ id }) => {
  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );
  const [animateInterminently, setAnimateInterminently] = useState(false);

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);


  const animationDataFetch = useMemo(() => {
    return animations.find((anim) => anim.id === controlUnitCacheId);
  }, [animations]);

  const animationDataExecute = useMemo(() => {
    return executeAnimations.find((anim) => anim.id === controlUnitCacheId);
  }, [executeAnimations]);

  const animationFetch = animationDataFetch && !animationDataExecute;
  const animationExecute = animationDataExecute && !animationDataFetch;
  const animationBoth = animationDataFetch && animationDataExecute;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: cacheMemoryId,
    targetComponentId: controlUnitId,
  });

  // Timer to animate interminently the bus when fetch and execute are active
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateInterminently((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [animateInterminently]);

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
      {animationFetch && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={fetchColor}
          reverse={animationDataFetch.reverse}
        />
      )}
      {animationExecute && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={executeColor}
          reverse={animationDataExecute.reverse}
        />
      )}
      {animationBoth && (
        <>
          {animateInterminently ? (
            <BusAnimation
              edgePath={edgePath}
              id={id}
              reverse={animationDataFetch.reverse}
              color={fetchColor}
            />
          ) : (
            <BusAnimation
              edgePath={edgePath}
              id={id}
              reverse={animationDataExecute.reverse}
              color={executeColor}
            />
          )}
        </>
      )}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-130%, -30px) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {animationFetch && (
            <Globe
              arrowPosition={"right"}
              title={textDataTitle("Datos (fetch)", typeSimulation)}
              color={fetchColor}
            >
              {animationDataFetch.data}
            </Globe>
          )}
          {animationExecute && (
            <Globe
              arrowPosition={"right"}
              title={textDataTitle("Datos (execute)", typeSimulation)}
              color={executeColor}
            >
              {animationDataExecute.data}
            </Globe>
          )}
          {animationBoth && (
            <div className="column" style={{ marginTop: "-40px" }}>
              <Globe
                arrowPosition={"right"}
                title={textDataTitle("Datos (fetch)", typeSimulation)}
                color={fetchColor}
              >
                {animationDataFetch.data}
              </Globe>
              <Globe
                arrowPosition={"right"}
                title={textDataTitle("Datos (execute)", typeSimulation)}
                color={executeColor}
              >
                {animationDataExecute.data}
              </Globe>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </g>
  );
};
