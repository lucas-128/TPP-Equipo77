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

export class DataTransferInstructionFactory {
  static createDataTransferInstruction(instruction) {
    const type = instruction[0];
    const register = parseInt(instruction[1], 16);
    const payload = parseInt(instruction[2] + instruction[3], 16);
    const registerDestination = parseInt(instruction[2], 16);
    const registerSource = parseInt(instruction[3], 16);
    switch (type) {
      case COPY_REGISTER_TO_REGISTER: {
        return new CopyRegisterToRegister(registerDestination, registerSource);
      }
      case LOAD_REGISTER_FROM_MEM: {
        return new LoadRegisterFromMem(register, payload);
      }
      case LOAD_REGISTER_FROM_PATTERN: {
        return new LoadRegisterFromPattern(register, payload);
      }
      case STORE_MEM_FROM_REGISTER: {
        return new StoreMemFromRegister(register, payload);
      }
    }
  }
}
