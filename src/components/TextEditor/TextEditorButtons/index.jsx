import React, { act, useEffect, useState } from "react";
import { Button, Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { setNewInstruction } from "../../../slices/editorTextSlice";

export const TextEditorButtons = ({
  isSimulating,
  setIsSimulating,
  setSelectedLine,
  selectedLine,
  text,
}) => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
  };

  const setPrevLine = () => {
    if (selectedLine === 0) return;
    const actualLine = text.split("\n")[selectedLine];
    setSelectedLine((prev) => Math.max(0, prev - 1));
    dispatch(setNewInstruction(actualLine)); //Aca deberiamos llamar al interprete
  };

  const setNextLine = () => {
    if (selectedLine === text.split("\n").length - 1) return;
    const actualLine = text.split("\n")[selectedLine];
    setSelectedLine((prev) => prev + 1);
    dispatch(setNewInstruction(actualLine)); //Aca deberiamos llamar al interprete
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
          <Button onClick={handleButtonClick}> Editar código</Button>
        </>
      ) : (
        <Button onClick={handleButtonClick}>Simular</Button>
      )}
    </Container>
  );
};
