import {
  COPY_REGISTER_TO_REGISTER,
  LOAD_REGISTER_FROM_MEM,
  LOAD_REGISTER_FROM_PATTERN,
  STORE_MEM_FROM_REGISTER,
  typeSimulations,
} from "../../constants";
import CopyRegisterToRegister from "./CopyRegisterToRegister";
import LoadRegisterFromMem from "./LoadRegisterFromMem.";
import LoadRegisterFromPattern from "./LoadRegisterFromPattern";
import StoreMemFromRegister from "./StoreMemFromRegister";

/*
  Class for Data Transfer Instructions
  This class is responsible for creating the correct instruction object
  based on the instruction type

  The instruction types are:
  - COPY_REGISTER_TO_REGISTER
  
*/

export class DataTransferInstruction {
  constructor(instruction) {
    this.type = instruction[0];
    this.cycle = "";

    if (this.type === COPY_REGISTER_TO_REGISTER) {
      const registerDestination = parseInt(instruction[2], 16);
      const registerSource = parseInt(instruction[3], 16);
      return new CopyRegisterToRegister(registerDestination, registerSource);
    } else {
      const register = parseInt(instruction[1], 16);
      const payload = parseInt(instruction[2] + instruction[3], 16);
      if (this.type === LOAD_REGISTER_FROM_MEM) {
        return new LoadRegisterFromMem(register, payload);
      } else if (this.type === LOAD_REGISTER_FROM_PATTERN) {
        return new LoadRegisterFromPattern(register, payload);
      } else if (this.type === STORE_MEM_FROM_REGISTER) {
        return new StoreMemFromRegister(register, payload);
      }
    }
  }

  // nextStep(oldState, typeSimulation) {
  //   if (typeSimulation === typeSimulations.SIMPLE) {
  //     return this.resolve(oldState);
  //   }
  // }
}
