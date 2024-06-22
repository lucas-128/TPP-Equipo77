import React from "react";
import { Container } from "./styled";
import { IoMdHelpCircle } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";

export const HelpButton = () => {
  return (
    <Container>
      <IoMdHelpCircle size={40} />
    </Container>
  );
};
