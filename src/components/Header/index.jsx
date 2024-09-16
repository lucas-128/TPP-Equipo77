import {
  HeaderContainer,
  HeaderTitle,
  HeaderSelect,
  HeaderOption,
  HeaderPipeliningColorReference,
  Cycle,
  FetchCycle,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { updateTypeSimulation } from "../../slices/applicationSlice";
import { typeSimulations } from "../../interpreter/constants";
import { useState } from "react";
import { FaCircle } from "react-icons/fa6";

export const Header = () => {
  const dispatch = useDispatch();
  const typeSimulation = useSelector(
    (state) => state.application.typeSimulation
  );
  const isSimulating = useSelector((state) => state.application.isSimulating);
  const fetchColor = useSelector((state) => state.application.fetch.color);
  const decodeColor = useSelector((state) => state.application.decode.color);
  const executeColor = useSelector((state) => state.application.execute.color);
  const [isPipelining, setIsPipelining] = useState(false);

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    // no anda el dispatch
    selected == typeSimulations.PIPELINING
      ? setIsPipelining(true)
      : setIsPipelining(false);
    dispatch(updateTypeSimulation(selected));
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Intérprete Máquina Ideal RISC</HeaderTitle>
      {isSimulating && isPipelining && (
        <HeaderPipeliningColorReference>
          <FetchCycle>Fetch:</FetchCycle>
          <FaCircle color={fetchColor} />
          <Cycle>Decode:</Cycle>
          <FaCircle color={decodeColor} />
          <Cycle>Execute:</Cycle>
          <FaCircle color={executeColor} />
        </HeaderPipeliningColorReference>
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
