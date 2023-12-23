"use client";
import HeaderToolBox from "@/components/custom/HeaderToolBox";
import Sidebar from "@/components/custom/Sidebar";
import SketchBoard from "@/components/custom/SketchBoard";

export default function Home() {
  return (
    <div className="flex justify-end sm:justify-center relative">
      <HeaderToolBox />
      <Sidebar />
      <SketchBoard />
    </div>
  );
}
