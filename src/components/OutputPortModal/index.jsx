import React from "react";
import { Modal } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowOutputPort } from "../../slices/applicationSlice";
import { BodyContainer, Container, Text } from "./styled";

export const OutputPortModal = () => {
  const dispatch = useDispatch();

  const showModal = useSelector(
    (state) => state.application.execute.showOutputPort
  );

  const app = useSelector((state) => state.application);

  const outputPortValue = useSelector(
    (state) => state.application.execute.mainMemoryCells[254]
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
            <Text $bold>{outputPortValue}</Text>
          </BodyContainer>
        </Container>
      </Modal>
    )
  );
};
