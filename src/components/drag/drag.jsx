"use client";
import { Hand } from "lucide-react";

export default function CanvasHint() {
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(false), 10000); // 10 sec
//     return () => clearTimeout(timer);
//   }, []);

//   if (!show) return null;

  return (
 <div className="fixed inset-x-0 z-[9999] w-[90%] max-w-sm
  top-1/2 -translate-y-1/2 sm:top-auto sm:bottom-4 sm:translate-y-0">
  <div className="bg-black/80 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fadeInOut justify-center">
    <div className="animate-drag">
      <Hand size={18} />
    </div>
    <span className="truncate">Drag to rotate • Scroll to zoom</span>
  </div>
</div>



  );
}
