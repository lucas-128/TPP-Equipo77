import React from "react";
import { Button, Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { getNewState } from "../../../interpreter/main";
import { updateRegisters } from "../../../slices/applicationSlice";

export const TextEditorButtons = ({
  isSimulating,
  setIsSimulating,
  setSelectedLine,
  selectedLine,
  text,
}) => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);

  const handleSimulateButtonClick = () => {
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
  };

  const handleEditCodeButtonClick = () => {
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
    dispatch(
      updateRegisters({ nodeId: "4", registers: new Array(16).fill("-") })
    );
  };

  const setPrevLine = () => {
    if (selectedLine === 0) return;
    const actualLine = text.split("\n")[selectedLine];
    setSelectedLine((prev) => Math.max(0, prev - 1));
    //processInstruction(actualLine);
  };

  const setNextLine = () => {
    if (selectedLine === text.split("\n").length) return;
    const actualLine = text.split("\n")[selectedLine];
    setSelectedLine((prev) => prev + 1);
    const newState = getNewState(applicationState, actualLine);
    dispatch(updateRegisters({ nodeId: "4", registers: newState.registers }));
  };

  return (
    <Container>
      {isSimulating ? (
        <>
          <Button onClick={() => setSelectedLine(0)}>
            <FaBackward />
          </Button>
          <Button onClick={setPrevLine}>
            <BiSolidLeftArrow />
          </Button>
          <Button onClick={setNextLine}>
            <BiSolidRightArrow />
          </Button>
          <Button onClick={() => setSelectedLine(text.split("\n").length - 1)}>
            <FaForward />
          </Button>
          <Button onClick={handleEditCodeButtonClick}> Editar código</Button>
        </>
      ) : (
        <Button onClick={handleSimulateButtonClick}>Simular</Button>
      )}
    </Container>
  );
};
