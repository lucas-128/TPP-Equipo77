import React from "react";
import { RegisterBox } from "../../components/RegisterBox";
import { MainMemory } from "../../components/MainMemory";
import { ALU } from "../../components/ALU";
import { ControlUnit } from "../../components/ControlUnit";
import { CacheMemory } from "../../components/CacheMemory";
import { CPU } from "../../components/CPU";

export const nodeTypes = {
  registers: RegisterBox,
  mainMemory: MainMemory,
  alu: ALU,
  controlUnit: ControlUnit,
  cacheMemory: CacheMemory,
  CPU: CPU,
};

export const aluId = "2";
export const mainMemoryId = "3";
export const registersId = "4";
export const controlUnitId = "5";
export const cacheMemoryId = "6";

export const initialNodes = [
  {
    id: "1",
    type: "CPU",
    data: { label: "CPU" },
    position: { x: 0, y: 0 },
    selectable: false,
    zIndex: -1,
  },
  {
    id: "2",
    type: "alu",
    data: { label: "ALU" },
    position: { x: 400, y: 400 },
    selectable: false,
  },

  {
    id: "3",
    type: "mainMemory",
    data: { label: "Main Memory" },
    position: { x: 1200, y: 0 },
    selectable: false,
  },
  {
    id: "4",
    type: "registers",
    data: { registers: new Array(16).fill("-") },
    position: { x: 50, y: 120 },
    selectable: false,
  },
  {
    id: "5",
    type: "controlUnit",
    data: { label: "Control Unit" },
    position: { x: 650, y: 120 },
    selectable: false,
  },
  {
    id: "6",
    type: "cacheMemory",
    data: { label: "Cache Memory" },
    position: { x: 670, y: 500 },
    selectable: false,
  },
];

export const initialEdges = [
  { id: "registers-cache", source: registersId, target: cacheMemoryId, type: "straight" }, // REGISTERS -> CACHE
  // { id: "e2-3", source: "3", target: "2", animated: true },
];
