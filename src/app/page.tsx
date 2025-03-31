import Layout from "@/components/Layout/Layout";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-5 min-h-screen">
    <div className="w-3/4 p-5">
      Hello
    </div>
    <div className="w-1/4 p-5">
      World
    </div>
    </div>
  );
}
