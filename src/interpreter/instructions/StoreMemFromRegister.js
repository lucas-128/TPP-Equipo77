import Instruction from "../Instruction";
import { updateCache } from "../utils";
import {
  registersControlUnitId,
  controlUnitCacheId,
  controlUnitCacheAddrBusId,
  controlUnitMainMemAddrId,
  mainMemControlUnitDataId,
} from "../../containers/SimulatorSection/components";

/* 
Instruction: 3
Store the content of register R in the memory cell with address XY
*/

export default class StoreMemFromRegister extends Instruction {
  constructor(register, memoryCell, id) {
    super(id);
    this.register = register;
    this.memoryCell = memoryCell;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    const { registers } = newExecuteState;
    newExecuteState.mainMemoryCells = [...oldState.execute.mainMemoryCells];
    const value = registers[this.register];
    newExecuteState.mainMemoryCells[this.memoryCell] = value;
    newExecuteState.cacheMemoryCells = updateCache(
      newExecuteState,
      this.memoryCell
    );
    newExecuteState.instructionId = this.id + 1;

    newExecuteState.edgeAnimation = [
      controlUnitMainMemAddrId,
      mainMemControlUnitDataId,
      registersControlUnitId,
      controlUnitCacheId,
      controlUnitCacheAddrBusId,
    ];

    return { ...oldState, execute: newExecuteState };
  }
}
