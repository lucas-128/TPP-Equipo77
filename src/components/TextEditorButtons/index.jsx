import React, { useState } from "react";
import { Button, Container } from "./styled";
import { FaBackward, FaForward } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

export const TextEditorButtons = ({
  isSimulating,
  setIsSimulating,
  setSelectedLine,
}) => {
  const handleButtonClick = () => {
    console.log("isSimulating: ", isSimulating);
    setIsSimulating((prev) => !prev);
    setSelectedLine(0);
  };

  return (
    <Container>
      {isSimulating ? (
        <>
          <Button onClick={() => setSelectedLine(0)}>
            <FaBackward />
          </Button>
          <Button>
            <BiSolidLeftArrow />
          </Button>
          <Button>
            <BiSolidRightArrow />
          </Button>
          <Button>
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
