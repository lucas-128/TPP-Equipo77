import {
  HeaderContainer,
  HeaderTitle,
  HeaderSelect,
  HeaderOption,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { updateTypeSimulation } from "../../slices/applicationSlice";
import { typeSimulations } from "../../interpreter/constants";

export const Header = () => {
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    dispatch(updateTypeSimulation(e.target.value));
  };

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulation
  );

  return (
    <HeaderContainer>
      <HeaderTitle>Intérprete Máquina Ideal RISC</HeaderTitle>
      <HeaderSelect
        value={typeSimulation}
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
