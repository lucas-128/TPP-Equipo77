import { animationsAlu, typeSimulations } from "./constants";
import { splitCode, validateSyntax } from "./main";
import { InstructionFactory } from "./InstructionFactory";

export default class Program {
  constructor(program, typeSimulation) {
    this.program = program;
    this.typeSimulation = typeSimulation;
    if (!validateSyntax(program)) {
      return;
    }
    this.instructions = this.createInstructions();
  }

  createInstructions() {
    const instructions = splitCode(this.program).filter(
      (row) => row.length > 0
    );

    return instructions.map((instruction, id) => {
      return InstructionFactory.createInstruction(instruction, id);
    });
  }

  /*  This method gets the current instruction id, depending on
      the current state of the program. If the fetch instruction id
      is not null, it means that the last cycle to be executed was
      the fetch cycle, so the current instruction id is the fetch
      instruction id and is going to execute the decode cycle.
      The same logic applies to the decode and execute (for the execute, 
      the instruction id is going to be the decode instruction id).
  */
  getCurrentInstructionId(state) {
    if (state.fetch.instructionId !== null) {
      console.log("DECODE", state.fetch.instructionId);
      return state.fetch.instructionId;
    } else if (state.decode.instructionId !== null) {
      console.log("EXECUTE", state.decode.instructionId);
      return state.decode.instructionId;
    }
    console.log("FETCH", state.execute.instructionId);
    return state.execute.instructionId || 0;
  }

  // TODO: Esto hacerlo directamente en el gteNextValue
  isValidId(id) {
    return id !== null && id < this.instructions.length;
  }

  getNextValue(value, lastCycleInst) {
    if (value == null) {
      return lastCycleInst === null ? null : 0;
    }
    return value + 1;
  }

  getNewState(oldState) {
    if (this.typeSimulation == typeSimulations.PIPELINING) {
      let newFetchState = oldState;
      let newDecodeState = oldState;
      let newExecuteState = oldState;

      let fetchInstructionId = this.getNextValue(
        oldState.fetch.instructionId,
        0
      );
      let decodeInstructionId = this.getNextValue(
        oldState.decode.instructionId,
        oldState.fetch.instructionId
      );
      let executeInstructionId = this.getNextValue(
        oldState.execute.instructionId,
        oldState.decode.instructionId
      );

      console.log("el id del fecth es ", fetchInstructionId);
      console.log("el id del decode es ", decodeInstructionId);
      console.log("el id del execute es ", executeInstructionId);

      if (this.isValidId(executeInstructionId)) {
        console.log(
          "la instruccion haciendo el execute es ",
          this.instructions[oldState.execute.instructionId]
        );
        const instructionExecute = this.instructions[executeInstructionId];
        newExecuteState = instructionExecute.nextStep(
          oldState,
          this.typeSimulation
        );
      }
      if (this.isValidId(fetchInstructionId)) {
        const instructionFetch = this.instructions[fetchInstructionId];
        console.log("la instruccion haciendo el fetch es ", instructionFetch);
        newFetchState = instructionFetch.nextStep(
          oldState,
          this.typeSimulation
        );
      } else {
        newFetchState = {
          fetch: { ...oldState.fetch, instructionId: fetchInstructionId, edgeAnimation: [] },
        };
        console.log("el fetch no es valido", newFetchState);
      }
      if (this.isValidId(decodeInstructionId)) {
        const intructionDecode = this.instructions[decodeInstructionId];
        console.log("la instruccion haciendo el decode es ", intructionDecode);
        newDecodeState = intructionDecode.nextStep(
          oldState,
          this.typeSimulation
        );
      } else {
        newDecodeState = {
          decode: { ...oldState.decode, instructionId: decodeInstructionId },
        };
      }

      console.log("lo que devuelvo es ", {
        ...oldState,
        fetch: { ...newFetchState.fetch },
        decode: {
          ...newDecodeState.decode,
        },
        execute: {
          ...newExecuteState.execute,
        },
      });

      return {
        ...oldState,
        fetch: { ...newFetchState.fetch },
        decode: { ...newDecodeState.decode },
        execute: {
          ...newExecuteState.execute,
          instructionId: executeInstructionId,
        },
      };
    }
    const actualInstruction =
      this.instructions[this.getCurrentInstructionId(oldState)];
    const newState = actualInstruction.nextStep(oldState, this.typeSimulation);
    return newState;
  }
}
