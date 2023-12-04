"use client";
import HeaderToolBox from "@/components/custom/HeaderToolBox";
import Sidebar from "@/components/custom/Sidebar";

export default function Home() {
  return (
    <div className="flex justify-center">
      <HeaderToolBox />
      <div>
        <Sidebar />
      </div>
    </div>
  );
}
