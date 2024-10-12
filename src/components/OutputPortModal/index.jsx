import React from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowOutputPort } from "../../slices/applicationSlice";
import { BodyContainer, Container, Text } from "./styled";
import { convertValue } from "../../interpreter/utils";

export const OutputPortModal = () => {
  const dispatch = useDispatch();

  const showModal = useSelector(
    (state) => state.application.execute.showOutputPort
  );

  const numericBase = useSelector((state) => state.application.numericBase);

  const outputPortValue = useSelector(
    (state) => state.application.execute.mainMemoryCells[255]
  );

  return (
    showModal && (
      <Modal
        title={"Puerto de salida"}
        msg={null}
        onClose={() => dispatch(setShowOutputPort(false))}
      >
        <Container>
          <BodyContainer>
            <Text>El valor de salida es: </Text>{" "}
            <Text $bold>{convertValue(outputPortValue, numericBase)}</Text>
          </BodyContainer>
        </Container>
      </Modal>
    )
  );
};
