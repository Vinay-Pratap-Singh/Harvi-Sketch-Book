// for toolkit slice initial state
export interface IInitialToolkitState {
  isCanvasLocked: boolean;
  currentShape: string | null;
  currentOperation: string | null;
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: ILineStroke;
  sketchBookBackground: string;
  shapeFillColor: string;
  fontType: string;
}

// for line stroke data
export interface ILineStroke {
  name: string;
  value: null | number;
  content: string;
}

// for font type
export interface IFontType {
  name: string;
  value: string;
}

// for canvas initial state
export interface IInitialCanvasState {
  currentCanvasIndex: number;
  allCanvasImageData: ImageData[];
  canvas: HTMLCanvasElement | null;
}

// for socket slice initial state
export interface IInitialSocketState {
  socket: any;
  name: string;
  roomId: string;
  userRole: string;
}

// for export type
export interface IExportData {
  fileName: string;
  fileType: string;
}

// interface for shapes arguments
export interface ICoordinate {
  startCoordinate: { x: number; y: number };
  endCoordinate: { x: number; y: number };
}
export interface IRectangleArgs {
  coordinate: ICoordinate;
  canvas?: HTMLCanvasElement;
  strokeColor: string;
  strokeStyle: ILineStroke;
  currentShapeFillColor: string;
  strokeWidth: number;
  roomId?: string;
}
