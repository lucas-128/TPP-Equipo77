import React from "react";
import { Container, TooltipText } from "./styled";
import { IoMdHelpCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setShowTutorial } from "../../slices/modalsSlice";

export const HelpButton = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <IoMdHelpCircle
        size={40}
        onClick={() => dispatch(setShowTutorial(true))}
        onMouseEnter={(e) => (e.currentTarget.nextSibling.style.visibility = "visible")}
        onMouseLeave={(e) => (e.currentTarget.nextSibling.style.visibility = "hidden")}
      />
      <TooltipText>Ayuda</TooltipText>
    </Container>
  );
};
