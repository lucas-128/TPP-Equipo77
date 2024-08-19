import { RegisterBox } from "../../components/RegisterBox";
import { MainMemory } from "../../components/MainMemory";
import { ALU } from "../../components/ALU";
import { ControlUnit } from "../../components/ControlUnit";
import { CacheMemory } from "../../components/CacheMemory";
import { CPU } from "../../components/CPU";

import { ALUToRegistersBus } from "../../components/Buses/ALUToRegistersBus";
import { MainMemControlDataBus } from "../../components/Buses/MainMemControlDataBus";
import { ControlToMainMemAddrBus } from "../../components/Buses/ControlToMainMemAddrBus";
import { CacheToControlUnitBus } from "../../components/Buses/CacheToControlUnitBus";
import { RegistersToUCBus } from "../../components/Buses/RegistersToUCBus";
import { RegistersToALUBus } from "../../components/Buses/RegistersToALUBus";

export const nodeTypes = {
  registers: RegisterBox,
  mainMemory: MainMemory,
  alu: ALU,
  controlUnit: ControlUnit,
  cacheMemory: CacheMemory,
  CPU: CPU,
};

export const CPUId = "1";
export const aluId = "2";
export const mainMemoryId = "3";
export const registersId = "4";
export const controlUnitId = "5";
export const cacheMemoryId = "6";

export const initialNodes = [
  {
    id: CPUId,
    type: "CPU",
    data: { label: "CPU" },
    position: { x: 0, y: 0 },
    selectable: false,
    zIndex: -1,
  },
  {
    id: aluId,
    type: "alu",
    data: { label: "ALU" },
    position: { x: 470, y: 420 },
    selectable: false,
  },
  {
    id: mainMemoryId,
    type: "mainMemory",
    data: { label: "Main Memory" },
    position: { x: 1300, y: 0 },
    selectable: false,
  },
  {
    id: registersId,
    type: "registers",
    data: { registers: new Array(16).fill("-") },
    position: { x: 50, y: 120 },
    selectable: false,
  },
  {
    id: controlUnitId,
    type: "controlUnit",
    data: { label: "Control Unit" },
    position: { x: 750, y: 120 },
    selectable: false,
  },
  {
    id: cacheMemoryId,
    type: "cacheMemory",
    data: { label: "Cache Memory" },
    position: { x: 770, y: 500 },
    selectable: false,
  },
];

export const edgeTypes = {
  controlUnitCache: CacheToControlUnitBus,
  registerToAlu: RegistersToALUBus,
  AluToRegisters: ALUToRegistersBus,
  memoryControlUnitData: MainMemControlDataBus,
  controlUnitToMainMemory: ControlToMainMemAddrBus,
  registersToControlUnit: RegistersToUCBus,
};

//export const registerCacheId = "registers-cache";
//export const cacheRegistersId = "cache-registers";
export const registersControlUnitId = "registers-control-unit";
export const controlUnitCacheId = "control-unit-cache";
export const registerAluTopId = "registers-alu-top";
export const registerAluBottomId = "registers-alu-bottom";
export const aluRegistersId = "alu-registers";
export const mainMemControlUnitDataId = "main-mem-control-unit-data";
// export const controlUnitMainMemDataId = "control-unit-main-mem-data";
export const controlUnitMainMemAddrId = "control-unit-main-mem-addr";

export const initialEdges = [
  /*{
    id: registerCacheId,
    source: registersId,
    target: cacheMemoryId,
    type: "registersCache",
  },*/
  {
    id: controlUnitCacheId,
    source: cacheMemoryId,
    target: controlUnitId,
    type: "controlUnitCache",
  },
  {
    id: registerAluTopId,
    source: registersId,
    target: aluId,
    type: "registerToAlu",
    data: { position: "top", animated: false },
  },
  {
    id: aluRegistersId,
    source: aluId,
    target: registersId,
    type: "AluToRegisters",
  },
  // los dos buses de data de la memoria principal al control y viceversa
  {
    id: mainMemControlUnitDataId,
    source: mainMemoryId,
    target: controlUnitId,
    type: "memoryControlUnitData",
  },
  // {
  //   id: controlUnitMainMemDataId,
  //   source: controlUnitId,
  //   target: mainMemoryId,
  //   type: "memoryControlUnitData",
  // },
  // bus de direcciones del control a la memoria principal
  {
    id: controlUnitMainMemAddrId,
    source: controlUnitId,
    target: mainMemoryId,
    type: "controlUnitToMainMemory",
  },
  {
    id: registersControlUnitId,
    source: registersId,
    target: controlUnitId,
    type: "registersToControlUnit",
  },
];
