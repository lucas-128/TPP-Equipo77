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
} from "../../../slices/applicationSlice";
import { Button } from "../../Button";
import { mainMemoryId } from "../../../containers/SimulatorSection/components";

export const TextEditorButtons = ({
  isSimulating,
  setIsSimulating,
  setSelectedLine,
  selectedLine,
  text,
}) => {
  const dispatch = useDispatch();
  const applicationState = useSelector((state) => state.application);

  const loadProgram = () => {
    ///const lines = text.trim().split("\n");
    const lines = splitCode(text);
    const parsedCode = lines.join("");
    console.log(parsedCode);
    let newMemory = new Array(32).fill("x");
    if (parsedCode.length > 64) {
      //64 Es porque tiene 32 celdas de memoria provisoria, deberia ser 512
      //TODO: Levantar algun tipo de advertencia ya que el programa no entra en memoria
    } else {
      newMemory = Array.from(
        { length: 32 },
        (_, i) => parsedCode.slice(i * 2, i * 2 + 2) || "x"
      );
      console.log("new memory", newMemory);
    }
    dispatch(
      updateMainMemoryCells({
        nodeId: mainMemoryId,
        mainMemoryCells: newMemory,
      })
    );
    dispatch(updateNodes({ nodeId: mainMemoryId, data: newMemory }));
  };

  const handleSimulateButtonClick = () => {
    loadProgram();
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
    const actualLine = text.split("\n")[selectedLine];
    const newState = getNewState(applicationState, actualLine);
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
        mainMemoryCells: new Array(31).fill("x").concat("00001000"), //Esto debe ser todo vacio, le puse el binario al final para hacer pruebas
      })
    );
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
    const actualLine = text.split("\n")[selectedLine + 1];
    setSelectedLine((prev) => prev + 1);
    const newState = getNewState(applicationState, actualLine, selectedLine);
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
