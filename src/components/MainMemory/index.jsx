import { useState } from "react";
import { Container } from "./styled";

export const MainMemory = () => {
  const initialRegisters = Array(256).fill("");
  const [registers, setRegisters] = useState(initialRegisters);

  return (
    <Container>
      <div>Memoria principal</div>
      {/* <div>
        <tbody>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 32 }).map((_, colIndex) => {
                const cellIndex = rowIndex * 32 + colIndex;
                return <td key={cellIndex}></td>;
              })}
            </tr>
          ))}
        </tbody>
      </div> */}
    </Container>
  );
};
