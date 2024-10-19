import React from "react";
import { Container } from "./styled";
import { IoMdHelpCircle } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setShowTutorial } from "../../slices/modalsSlice";

export const HelpButton = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <IoMdHelpCircle
        size={40}
        onClick={() => dispatch(setShowTutorial(true))}
      />
    </Container>
  );
};
