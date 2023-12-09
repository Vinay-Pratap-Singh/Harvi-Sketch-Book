import {
  IExportData,
  IFontType,
  ILineStroke,
} from "@/helper/interface/interface";

export const STROKE_STYLE_COLOR_CODE: string[] = [
  "#000000",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f97316",
  "#6366f1",
];

export const CANVAS_BG_COLOR_CODE: string[] = [
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

export const FONT_TYPE: IFontType[] = [
  { name: "Arial", value: "Arial" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Times New Roman", value: "'Times New Roman', serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier New", value: "'Courier New', monospace" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
];

export const IMAGE_EXPORT_FORMAT: IExportData[] = [
  {
    fileName: "PNG",
    fileType: "image/png",
  },
  {
    fileName: "JPEG",
    fileType: "image/jpeg",
  },
  {
    fileName: "WEBP",
    fileType: "image/webp",
  },
];
