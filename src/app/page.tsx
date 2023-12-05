"use client";
import HeaderToolBox from "@/components/custom/HeaderToolBox";
import Sidebar from "@/components/custom/Sidebar";
import SketchBoard from "@/components/custom/SketchBoard";

export default function Home() {
  return (
    <div className="flex justify-center">
      <HeaderToolBox />
      <Sidebar />
      <SketchBoard />
    </div>
  );
}
