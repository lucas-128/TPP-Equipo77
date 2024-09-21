import React, { useState } from "react";
import { Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { splitCode } from "../../../interpreter/main";
import {
  goToPreviousState,
  updatePreviousState,
  updateCurrentState,
  clearApplication,
  setIsSimulating,
} from "../../../slices/applicationSlice";
import { Button } from "../../Button";
import Program from "../../../interpreter/Program";

export const TextEditorButtons = ({ text }) => {
  const [program, setProgram] = useState(null);
  const isSimulating = useSelector((state) => state.application.isSimulating);
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
      (_, i) => parsedCode.slice(i * 2, i * 2 + 2) || "-"
    );
  };

  const handleSimulateButtonClick = () => {
    dispatch(setIsSimulating(!isSimulating));
    const newMemory = getProgramInMemory();
    const newProgram = new Program(text, applicationState.typeSimulations);
    setProgram(newProgram);
    const newState = newProgram.getNewState({
      ...applicationState,
      fetch: { ...applicationState.fetch, programCounter: 0, instructionId: null },
      execute: { ...applicationState.execute, mainMemoryCells: newMemory},
    });
    dispatch(updateCurrentState(newState));
  };

  const handleEditCodeButtonClick = () => {
    dispatch(setIsSimulating(!isSimulating));
    dispatch(clearApplication());
  };

  const setPrevLine = () => {
    dispatch(goToPreviousState());
  };

  const setNextLine = () => {
    if(applicationState.execute.endProgram) {
      dispatch(setIsSimulating(false));
      dispatch(clearApplication());
      return;
    }
    dispatch(updatePreviousState()); //TODO: Revisar esto porque creo que el primer estado guarda un previous state que no deberia
    dispatch(updateCurrentState(program.getNewState(applicationState)));
  };

  return (
    <Container>
      {isSimulating ? (
        <>
          {/* TODO> ver forma de volver al principio de todo, primera inst. De ultima sacar flecha */}
          <Button onClick={() => {}}>
            <FaBackward />
          </Button>
          <Button onClick={setPrevLine}>
            <BiSolidLeftArrow />
          </Button>
          <Button onClick={setNextLine}>
            <BiSolidRightArrow />
          </Button>
          {/* TODO> ver forma de ir al final de todo, estado de ultima inst. De ultima sacar flecha */}
          <Button onClick={() => {}}>
            <FaForward />
          </Button>
          <Button onClick={handleEditCodeButtonClick}> Editar</Button>
        </>
      ) : (
        <Button disabled={text.length == 0} onClick={handleSimulateButtonClick}>
          Simular
        </Button>
      )}
    </Container>
  );
};
