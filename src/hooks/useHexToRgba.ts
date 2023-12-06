import { useEffect, useRef, useState } from "react";

// Custom hook for converting hex to RGBA
const useHexToRgba = (hexColor: string) => {
  const [rgbaColor, setRgbaColor] = useState("");

  useEffect(() => {
    const hexToRgba = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, 1)`;
    };

    setRgbaColor(hexToRgba(hexColor));
  }, [hexColor]);

  return rgbaColor;
};

export default useHexToRgba;
