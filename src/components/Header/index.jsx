import {
  HeaderContainer,
  HeaderTitle,
  HeaderSelect,
  HeaderOption,
  HeaderCyclesColorReference,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNumericBase,
  updateTypeSimulation,
} from "../../slices/applicationSlice";
import { numericBaseType, typeSimulations } from "../../interpreter/constants";
import { useState, useMemo } from "react";
import {
  fetchReference,
  decodeReference,
  executeReference,
  cycleReference,
} from "./utils";
import { Switch } from "@mui/material";

export const Header = () => {
  const dispatch = useDispatch();
  const [isPipelining, setIsPipelining] = useState(false);
  const [isCycles, setIsCycles] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState("none");

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulation
  );
  const numericBase = useSelector((state) => state.application.numericBase);
  const isSimulating = useSelector((state) => state.application.isSimulating);
  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const fetchColor = useSelector((state) => state.application.fetch.color);
  const decodeColor = useSelector((state) => state.application.decode.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const fetchInstruction = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

  const decodeInstruction = useSelector(
    (state) => state.application.decode.instructionRegister
  );
  const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );
  const executeId = useSelector(
    (state) => state.application.execute.instructionId
  );
  const executeInstruction = useMemo(() => {
    if (executeId === null || executeId === -1) return null;
    const execId = isCycles ? executeId - 1 : executeId;
    const firstHalf = mainMemoryCells[execId + 1 * execId];
    const secondHalf = mainMemoryCells[execId + 1 * execId + 1];
    return firstHalf + secondHalf;
  }, [executeId]);

  const handleExecutionSelectChange = (e) => {
    const selected = e.target.value;
    selected == typeSimulations.PIPELINING
      ? setIsPipelining(true)
      : setIsPipelining(false);
    selected == typeSimulations.CYCLES ? setIsCycles(true) : setIsCycles(false);
    dispatch(updateTypeSimulation(selected));
  };

  const handleNumericBaseSelectChange = (e) => {
    const selected = e.target.value;
    dispatch(updateNumericBase(selected));
  };

  const handleColorBlindModeChange = (event) => {
    const newMode = event.target.checked ? "high-contrast" : "none";
    setColorBlindMode(newMode);
    document.body.classList.remove("color-blind-high-contrast");
    if (newMode === "high-contrast") {
      document.body.classList.add(`color-blind-${newMode}`);
    }
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Intérprete Máquina Ideal RISC</HeaderTitle>
      {isSimulating && isPipelining && (
        <HeaderCyclesColorReference>
          {fetchReference(fetchInstruction, fetchColor)}
          {decodeReference(decodeInstruction, decodeColor)}
          {executeReference(executeInstruction, executeColor)}
        </HeaderCyclesColorReference>
      )}
      {isSimulating && isCycles && (
        <HeaderCyclesColorReference>
          {cycleReference(
            [fetchId, decodeId, executeId],
            [fetchInstruction, decodeInstruction, executeInstruction],
            [fetchColor, decodeColor, executeColor]
          )}
        </HeaderCyclesColorReference>
      )}
      <div className="row">
        <HeaderTitle>Alto contraste</HeaderTitle>
        <Switch
          checked={colorBlindMode === "high-contrast"}
          onChange={handleColorBlindModeChange}
          color="primary"
        />

        <HeaderSelect
          value={numericBase}
          onChange={(e) => handleNumericBaseSelectChange(e)}
        >
          <HeaderOption value={numericBaseType.BINARY}>
            Base binaria
          </HeaderOption>
          <HeaderOption value={numericBaseType.HEXA}>
            Base hexadecimal
          </HeaderOption>
        </HeaderSelect>

        <HeaderSelect
          value={typeSimulation}
          disabled={isSimulating}
          onChange={(e) => handleExecutionSelectChange(e)}
        >
          <HeaderOption value={typeSimulations.SIMPLE}>
            Ejecución simple
          </HeaderOption>
          <HeaderOption value={typeSimulations.CYCLES}>
            Ejecución por ciclos
          </HeaderOption>
          <HeaderOption value={typeSimulations.PIPELINING}>
            Ejecución con pipelining
          </HeaderOption>
        </HeaderSelect>
      </div>
    </HeaderContainer>
  );
};
