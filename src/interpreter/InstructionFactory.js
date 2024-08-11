import * as constants from "./constants";
import AdditionTwoComplement from "./instructions/AdditionTwoComplement";
import ANDInstruction from "./instructions/ANDInstruction";
import Branch from "./instructions/Branch";
import CopyRegisterToRegister from "./instructions/CopyRegisterToRegister";
import End from "./instructions/EndIntruction";
import FloatingPointSum from "./instructions/FloatingPointSum";
import LoadRegisterFromMem from "./instructions/LoadRegisterFromMem.";
import LoadRegisterFromPattern from "./instructions/LoadRegisterFromPattern";
import ORInstruction from "./instructions/ORInstruction";
import RotateRight from "./instructions/RotateRight";
import StoreMemFromRegister from "./instructions/StoreMemFromRegister";
import XORInstruction from "./instructions/XORInstruction";

/*
    Class for Instructions
    This class is responsible for creating the correct instruction object
    based on the instruction type

*/

export class InstructionFactory {
  static createInstruction(instruction) {
    const type = instruction[0];

    const register = parseInt(instruction[1], 16);
    const payload = parseInt(instruction[2] + instruction[3], 16);

    const registerDestination = parseInt(instruction[2], 16);
    const registerSource = parseInt(instruction[3], 16);

    const registerSIndex = parseInt(instruction[2], 16);
    const registerTIndex = parseInt(instruction[3], 16);

    switch (type) {
      case constants.COPY_REGISTER_TO_REGISTER: {
        return new CopyRegisterToRegister(registerDestination, registerSource);
      }
      case constants.LOAD_REGISTER_FROM_MEM: {
        return new LoadRegisterFromMem(register, payload);
      }
      case constants.LOAD_REGISTER_FROM_PATTERN: {
        // sin parsear, guardo todo como hexa
        return new LoadRegisterFromPattern(register, instruction[2] + instruction[3]);
      }
      case constants.STORE_MEM_FROM_REGISTER: {
        return new StoreMemFromRegister(register, payload);
      }
      case constants.ADDITION_TWO_COMPLEMENT:
        return new AdditionTwoComplement(
          registerSIndex,
          registerTIndex,
          register
        );
      case constants.FLOATING_POINT_SUM:
        return new FloatingPointSum(registerSIndex, registerTIndex, register);
      case constants.ROTATE_RIGHT:
        return new RotateRight(register, registerTIndex);
      case constants.OR:
        return new ORInstruction(registerSIndex, registerTIndex, register);
      case constants.AND:
        return new ANDInstruction(registerSIndex, registerTIndex, register);
      case constants.XOR:
        return new XORInstruction(registerSIndex, registerTIndex, register);
      case constants.JUMP_TO:
        return new Branch(instruction);
      case constants.END:
        return new End(instruction);
    }
  }
}
