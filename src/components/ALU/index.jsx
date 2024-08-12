import { useDispatch, useSelector } from "react-redux";
import { aluId } from "../../containers/SimulatorSection/components";
import { Container, CustomHandle } from "./styled";
import { setOpenAluZoom } from "../../slices/modalsSlice";

export const ALU = () => {
  const dispatch = useDispatch();

  const aluOperation = useSelector((state) => state.application.execute.aluOperation);

  return (
    <Container
      id={aluId}
      $operating={aluOperation}
      onClick={aluOperation ? () => dispatch(setOpenAluZoom(true)) : () => {}}
    >
      <CustomHandle
        type="target"
        position="left"
        style={{ background: "#555" }}
      />
      <CustomHandle
        type="target"
        position="left"
        style={{ background: "#555" }}
      />
      ALU
      <CustomHandle
        type="source"
        position="right"
        style={{ background: "#555" }}
      />
    </Container>
  );
};
