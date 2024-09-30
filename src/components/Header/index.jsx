import {
  HeaderContainer,
  HeaderTitle,
  HeaderSelect,
  HeaderOption,
  HeaderCyclesColorReference,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { updateTypeSimulation } from "../../slices/applicationSlice";
import { typeSimulations } from "../../interpreter/constants";
import { useState, useMemo } from "react";
import {
  fetchReference,
  decodeReference,
  executeReference,
  cycleReference,
} from "./utils";

export const Header = () => {
  const dispatch = useDispatch();
  const [isPipelining, setIsPipelining] = useState(false);
  const [isCycles, setIsCycles] = useState(false);
  const typeSimulation = useSelector(
    (state) => state.application.typeSimulation
  );
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
    let execId = executeId ? executeId : 0;
    execId = isCycles ? execId - 1 : execId;
    const firstHalf = mainMemoryCells[execId + 1 * execId];
    const secondHalf = mainMemoryCells[execId + 1 * execId + 1];
    return firstHalf + secondHalf;
  }, [executeId]);

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    selected == typeSimulations.PIPELINING
      ? setIsPipelining(true)
      : setIsPipelining(false);
    selected == typeSimulations.CYCLES ? setIsCycles(true) : setIsCycles(false);
    dispatch(updateTypeSimulation(selected));
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
      <HeaderSelect
        value={typeSimulation}
        disabled={isSimulating}
        onChange={(e) => handleSelectChange(e)}
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
    </HeaderContainer>
  );
};
