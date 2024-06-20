import { Handle } from "reactflow";

export const ALU = () => {
  let input1 = "num1";
  let input2 = "num2";
  let output = "num3";

  return (
    <div
      className="ALU"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        background: "lightblue",
        width: "150px",
        height: "150px",
        clipPath:
          "polygon(0 0, 100% 29%, 100% 67%, 0 100%, 0% 69%, 24% 48%, 0 29%)",
      }}
    >
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <Handle type="target" position="right" style={{ background: "#555" }} />
      ALU
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};
