import { useState } from "react";

export const MainMemory = () => {
  const initialRegisters = Array(256).fill("");
  const [registers, setRegisters] = useState(initialRegisters);

  const handleInputChange = (index, event) => {
    const newRegisters = [...registers];
    newRegisters[index] = event.target.value;
    setRegisters(newRegisters);
  };

  return (
    <table>
      <tbody>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 32 }).map((_, colIndex) => {
              const cellIndex = rowIndex * 32 + colIndex;
              return (
                <td key={cellIndex}>
                  <input
                    type="text"
                    value={registers[cellIndex]}
                    onChange={(event) => handleInputChange(cellIndex, event)}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
