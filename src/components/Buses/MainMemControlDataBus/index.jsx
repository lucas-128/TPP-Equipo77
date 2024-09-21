import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { BaseEdge, EdgeLabelRenderer } from "reactflow";
import { usePosition } from "../../../hooks/usePosition";
import { mainMemControlUnitDataId } from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { typeSimulations } from "../../../interpreter/constants";
import { textDataTitle } from "../utils";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const [animateInterminently, setAnimateInterminently] = useState(false);
  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const animationDataFetch = useMemo(() => {
    return animations.find((anim) => anim.id === mainMemControlUnitDataId);
  }, [animations, mainMemControlUnitDataId]);

  const animationDataExecute = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === mainMemControlUnitDataId
    );
  }, [executeAnimations, mainMemControlUnitDataId]);

  const animationFetch = animationDataFetch && !animationDataExecute;
  const animationExecute = animationDataExecute && !animationDataFetch;
  const animationBoth = animationDataFetch && animationDataExecute;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: source,
    targetComponentId: target,
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
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -140%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {animationFetch && (
            <Globe
              arrowPosition={"bottom"}
              title={textDataTitle("Datos (fetch)", typeSimulation)}
              color={fetchColor}
            >
              {instructionRegister}
            </Globe>
          )}
          {animationExecute && (
            <Globe
              arrowPosition={"bottom"}
              title={textDataTitle("Datos (execute)", typeSimulation)}
              color={executeColor}
            >
              {animationDataExecute.data}
            </Globe>
          )}
          {animationBoth && (
            <div className="row">
              <Globe
                arrowPosition={"bottom"}
                title={"Datos (fetch)"}
                color={fetchColor}
              >
                {animationDataFetch.data}
              </Globe>
              <Globe
                arrowPosition={"bottom"}
                title={"Datos (execute)"}
                color={executeColor}
              >
                {animationDataExecute.data}
              </Globe>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
      {animationFetch && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationDataFetch.reverse}
          color={fetchColor}
        />
      )}
      {animationExecute && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationDataExecute.reverse}
          color={executeColor}
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
    </g>
  );
};
