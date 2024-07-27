import React from "react";
import { Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { getNewState, splitCode } from "../../../interpreter/main";
import {
  updateRegisters,
  updateEdgeAnimation,
  goToPreviousState,
  updatePreviousState,
  updateMainMemoryCells,
  updateCurrentState,
  updateInstructionRegister,
  updateNodes,
  updateProgramCounter,
} from "../../../slices/applicationSlice";
import { Button } from "../../Button";
import Program from "../../../interpreter/Program";

export const TextEditorButtons = ({
  isSimulating,
  setIsSimulating,
  setSelectedLine,
  selectedLine,
  text,
}) => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);

  // TODO: Esto se puede pasar al state directamente (dispatchear memory)
  const getProgramInMemory = () => {
    const parsedCode = splitCode(text).join("");
    if (parsedCode.length > 512) {
      // TODO: ERROR => el programa no entra en memoria
    }
    return Array.from(
      { length: 256 },
      (_, i) => parsedCode.slice(i * 2, i * 2 + 2) || "x"
    );
  };

  const handleSimulateButtonClick = () => {
    const newMemory = getProgramInMemory();
    setIsSimulating((prev) => !prev);
    const program = new Program(text);
    //setSelectedLine(0);
    const actualLine = text.split("\n")[selectedLine];
    const newState = getNewState(
      {
        ...applicationState,
        mainMemoryCells: newMemory,
      },
      actualLine,
      selectedLine
    );
    dispatch(updatePreviousState()); //TODO: Revisar esto porque creo que el primer estado guarda un previous state que no deberia
    dispatch(updateCurrentState(newState));
  };

  const resetState = () => {
    dispatch(
      updateRegisters({ nodeId: "4", registers: new Array(16).fill("-") })
    );
    dispatch(
      updateEdgeAnimation({
        edgeAnimation: {
          registerAluTop: false,
          registerAluBottom: false,
          registerCache: false,
          aluRegisters: false,
          cacheRegisters: false,
        },
      })
    );
    dispatch(
      updateMainMemoryCells({
        nodeId: "3",
        mainMemoryCells: new Array(255).fill("x").concat("00001000"), //Esto debe ser todo vacio, le puse el binario al final para hacer pruebas
      })
    );
    dispatch(updateInstructionRegister({ instructionRegister: "-" }));
    dispatch(updateProgramCounter({ programCounter: "-" }));
  };

  const handleEditCodeButtonClick = () => {
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
    resetState();
  };

  const setPrevLine = () => {
    if (selectedLine === 0) return;
    setSelectedLine((prev) => Math.max(0, prev - 1));
    dispatch(goToPreviousState());
  };

  const setNextLine = () => {
    if (selectedLine === text.split("\n").length) return;
    const nextLine = selectedLine + 1;
    const actualLine = text.split("\n")[nextLine];
    setSelectedLine((prev) => prev + 1);
    const newState = getNewState(applicationState, actualLine, nextLine);
    dispatch(updatePreviousState()); //TODO: Revisar esto porque creo que el primer estado guarda un previous state que no deberia
    dispatch(updateCurrentState(newState));
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
          <Button onClick={handleEditCodeButtonClick}> Editar</Button>
        </>
      ) : (
        <Button onClick={handleSimulateButtonClick}>Simular</Button>
      )}
    </Container>
  );
};
