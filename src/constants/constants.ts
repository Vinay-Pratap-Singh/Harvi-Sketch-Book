import { ILineStroke } from "@/helper/interface/interface";

export const STROKE_STYLE_COLOR_CODE = [
  "#000000",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f97316",
  "#6366f1",
];

export const CANVAS_BG_COLOR_CODE = [
  "#FFFFFF",
  "#F8F9FA",
  "#F5FAFF",
  "#FFFCE8",
  "#FDF8F6",
];

export const STROKE_LINE_STYLE: ILineStroke[] = [
  {
    name: "normal",
    content: "-",
    value: null,
  },
  {
    name: "dotted",
    content: "&middot;",
    value: 2,
  },
  {
    name: "dashed",
    content: "--",
    value: 10,
  },
];
