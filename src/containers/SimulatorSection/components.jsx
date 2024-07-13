import { RegisterBox } from "../../components/RegisterBox";
import { MainMemory } from "../../components/MainMemory";
import { ALU } from "../../components/ALU";
import { ControlUnit } from "../../components/ControlUnit";
import { CacheMemory } from "../../components/CacheMemory";
import { CPU } from "../../components/CPU";
import { RegistersCacheBus } from "../../components/RegistersCacheBus";
import { RegistersALUBus } from "../../components/RegistersALUBus";
import { Position } from "reactflow";

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
  "registers-cache": RegistersCacheBus,
  "registers-alu": RegistersALUBus,
};

export const initialEdges = [
  {
    id: "registers-cache",
    source: registersId,
    target: cacheMemoryId,
    type: "registers-cache",
  },
  {
    id: "registers-alu-top",
    source: registersId,
    target: aluId,
    type: "registers-alu",
    data: { position: "top" },
  },
  {
    id: "registers-alu-bottom",
    source: registersId,
    target: aluId,
    type: "registers-alu",
    data: { position: "bottom" },
  },
  {
    id: "alu-registers",
    source: aluId,
    target: registersId,
    type: "registers-alu",
    sourcePosition: Position.Bottom,
    targetPosition: Position.Bottom,
  },
  // {
  //   id: "cache-registers",
  //   source: cacheMemoryId,
  //   target: registersId,
  //   type: "smoothstep",
  //   animated: true,
  //   style: {
  //     // use 0.2s to speed up the animation
  //     animation: "dashdraw 0.5s linear infinite",
  //     strokeDasharray: 6,
  //     strokeWidth: 7,
  //   },
  // }
];
