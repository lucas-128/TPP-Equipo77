import React from "react";
import { BaseEdge } from "reactflow";

export const BusAnimation = ({ edgePath, id, reverse }) => {
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: "none" }} />
      <g>
        <path
          d={edgePath}
          stroke="black"
          strokeWidth={5}
          strokeDasharray="15,15"
          strokeDashoffset="0"
          strokeLinecap="round"
          fill="none"
          style={{
            animation: `dash 15s linear infinite ${reverse ? "" : "reverse"}`,
          }}
        />
      </g>
    </>
  );
};
