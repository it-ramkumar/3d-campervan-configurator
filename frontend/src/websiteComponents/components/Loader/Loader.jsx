import React from "react";
import { Loader2 } from "lucide-react";

export default function BigBearLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-white">
      <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
      <p className="mt-4 text-sm text-blue-900">Loading Big Bear Vans...</p>
    </div>
  );
}
