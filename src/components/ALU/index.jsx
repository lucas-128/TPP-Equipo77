import { Handle } from "reactflow";

export const ALU = () => {
  let input1 = "num1";
  let input2 = "num2";
  let output = "num3";

  return (
    <div className="ALU" style={{background: 'orange'}}>
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <Handle type="target" position="right" style={{ background: "#555" }} />
      <div>
        <p>Input 1: {input1}</p>
        <p>Input 2: {input2}</p>
      </div>
      <div>
        <p>Output: {output}</p>
      </div>
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};
