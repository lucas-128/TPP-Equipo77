export function applyBinaryOperation(this, operation, actualState) {
    const newState = { ...actualState, registers: [...actualState.registers] };
    const registerS = parseInt(actualState.registers[this.registerSIndex], 2);
    const registerT = parseInt(actualState.registers[this.registerTIndex], 2);
    const operationResult = operation(registerS, registerT);
    newState.aluOperation = {
      operation: operationNames[this.type],
      registerS: actualState.registers[this.registerSIndex],
      registerT: actualState.registers[this.registerTIndex],
      registerSIndex: this.registerSIndex,
      registerTIndex: this.registerTIndex,
      destinationIndex: this.destinationIndex,
      result: operationResult,
    };
    newState.registers[this.destinationIndex] = operationResult;
    return newState;
  }
