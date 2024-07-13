import { useSelector } from "react-redux";
import { BaseEdge, getSmoothStepPath, Position } from "reactflow";
import {
  aluId,
  registersId,
} from "../../containers/SimulatorSection/components";
import { getComponentInfo } from "../../containers/SimulatorSection/utils";

export const RegistersALUBus = ({ data, source }) => {
  const nodes = useSelector((state) => state.application.nodes);
  const registersInfo = getComponentInfo(registersId, nodes);
  const aluInfo = getComponentInfo(aluId, nodes);

  const getPositions = () => {
    if (source === aluId) {
      return {
        sourceX: aluInfo.position.x + aluInfo.width,
        sourceY: aluInfo.position.y + aluInfo.height / 2,
        targetX: registersInfo.position.x + registersInfo.width / 2,
        targetY: registersInfo.position.y + registersInfo.height,
        offset: 40,
        sourcePosition: Position.Right,
        targetPosition: Position.Bottom,
      };
    }
    return {
      sourceX: registersInfo.position.x + registersInfo.width,
      sourceY: registersInfo.position.y + registersInfo.height / 2,
      targetX: aluInfo.position.x,
      targetY:
        aluInfo.position.y +
        (data.position === "top" ? aluInfo.height / 6 : aluInfo.height / 1.2),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  };

  const positions = getPositions();
  const [edgePath] = getSmoothStepPath({
    sourceX: positions.sourceX,
    sourceY: positions.sourceY,
    targetX: positions.targetX,
    targetY: positions.targetY,
    offset: positions.offset,
    sourcePosition: positions.sourcePosition,
    targetPosition: positions.targetPosition,
  });

  return (
    <g>
      <defs>
        <pattern
          id="animated-pattern"
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <line x1="0" y1="0" x2="10" y2="10" stroke="blue" strokeWidth="15">
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="10"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </pattern>
      </defs>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        animated={true}
        style={{
          stroke: "grey",
          strokeWidth: 20,
        }}
      />
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "url(#animated-pattern)",
          strokeWidth: 10,
          animation: "dashdraw 0.5s linear infinite",
          strokeDasharray: 6,
        }}
      />
    </g>
  );
};
