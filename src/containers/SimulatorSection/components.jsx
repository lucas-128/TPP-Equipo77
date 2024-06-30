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
    position: { x: 365, y: 800 },
    selectable: false,
  },

  {
    id: "3",
    type: "mainMemory",
    data: { label: "Main Memory" },
    position: { x: 900, y: 0 },
    selectable: false,
  },
  {
    id: "4",
    type: "registers",
    data: { registers: new Array(16).fill("-") },
    position: { x: 50, y: 350 },
    selectable: false,
  },
  {
    id: "5",
    type: "controlUnit",
    data: { label: "Control Unit" },
    position: { x: 100, y: 125 },
    selectable: false,
  },
  {
    id: "6",
    type: "cacheMemory",
    data: { label: "Cache Memory" },
    position: { x: 350, y: 350 },
    selectable: false,
  },
];

export const initialEdges = [
  /*
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "3", target: "2", animated: true },*/
];