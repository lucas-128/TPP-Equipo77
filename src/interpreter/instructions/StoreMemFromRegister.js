import Instruction from "../Instruction";
import { updateCache, toHexa, toHexaPadStart } from "../utils";

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
  constructor(type, register, memoryCell, id) {
    super(type, id);
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
      { id: registersControlUnitId, reverse: false },
      { id: controlUnitCacheId, reverse: true },
      controlUnitMainMemAddrId,
      { id: mainMemControlUnitDataId, reverse: true },
      controlUnitCacheAddrBusId,
    ];

    return { ...oldState, execute: newExecuteState };
  }

  toString() {
    return [
      "Opcode: 3 (STORE)",
      "Origen: Registro " + toHexa(this.register),
      "Destino: Dirección " + toHexaPadStart(this.memoryCell),
    ];
  }
}
