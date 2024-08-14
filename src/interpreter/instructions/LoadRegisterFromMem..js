import { animationsFetch, typeSimulations } from "../../interpreter/constants";
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

Instruction: 1
Load the content of the memory cell with address XY into register R

*/

export default class LoadRegisterFromMem extends Instruction {
  constructor(register, memoryAddress, id) {
    super(id);
    this.register = register;
    this.memoryAddress = memoryAddress;
  }

  execute(oldState) {
    const newExecuteState = { ...oldState.execute };
    newExecuteState.registers = [...oldState.execute.registers];
    const { cacheMemoryCells } = oldState.execute;
    const { mainMemoryCells } = oldState.execute;

    const cell = cacheMemoryCells.find((cell) =>
      cell ? cell.address === this.memoryAddress : false
    );
    if (cell) {
      newExecuteState.registers[this.register] = cell.content;
      return { ...oldState, execute: newExecuteState };
    } else {
      newExecuteState.cacheMemoryCells = [...oldState.execute.cacheMemoryCells];
      newExecuteState.cacheMemoryCells = updateCache(
        newExecuteState,
        this.memoryAddress
      );
    }

    const value = mainMemoryCells[this.memoryAddress];

    newExecuteState.registers[this.register] = value;
    newExecuteState.instructionId = this.id + 1;
    newExecuteState.edgeAnimation = [
      { id: registersControlUnitId, reverse: true },
      { id: controlUnitCacheId, reverse: true },
      controlUnitCacheAddrBusId,
      controlUnitMainMemAddrId,
      { id: mainMemControlUnitDataId, reverse: false },
    ];

    return { ...oldState, execute: newExecuteState };
  }
}
