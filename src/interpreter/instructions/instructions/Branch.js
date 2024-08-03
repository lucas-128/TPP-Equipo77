import { typeSimulations } from "../../constants";
import Instruction from "../../Instruction";
import {
  registerAluBottomId,
  registerAluTopId,
  aluRegistersId,
} from "../../../containers/SimulatorSection/components";

/*

Instruction: b
Jumps to the instruction at address XY if the content of register R is equal to the content of register 0

*/

export class Branch extends Instruction {
  constructor(instruction) {
    super();
    this.type = instruction[0];
    this.cycle = "";
  }

  resolve(oldState) {
    // TODO: cambiarlo para la instrucción branch
    const newState = { ...oldState };
    newState.edgeAnimation = [
      registerAluBottomId,
      registerAluTopId,
      aluRegistersId,
    ];
    newState.programCounter += 1;
    return newState;
  }
}
