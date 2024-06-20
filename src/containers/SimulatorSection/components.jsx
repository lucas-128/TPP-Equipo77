import React from "react";
import { RegisterBox } from "../../components/RegisterBox";
import { MainMemory } from "../../components/MainMemory";
import { ALU } from "../../components/ALU";

export const nodeTypes = {
  registers: RegisterBox,
  mainMemory: MainMemory,
  alu: ALU,
};

export const initialNodes = [
  {
    id: "1",
    type: "alu",
    data: { label: "ALU" },
    position: { x: 600, y: 400 },
  },

  {
    id: "2",
    type: "mainMemory",
    data: { label: "Main Memory" },
    position: { x: 400, y: 900 },
  },
  {
    id: "3",
    type: "registers",
    data: { label: "Registers" },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "3", target: "2", animated: true },
];
