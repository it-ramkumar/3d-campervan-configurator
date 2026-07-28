// app/camper-vans-for-sale/[slug]/loading.jsx
import Loader from "@/components/Loader/Loader"; // Aapka apna custom loader

export default function Loading() {
  return (
    <div className="w-full h-screen bg-secondary flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Aapka spinner component */}
        <Loader />
        <p className="text-primary/70 font-body text-sm animate-pulse uppercase tracking-wider">
          Fetching Van Details...
        </p>
      </div>
    </div>
  );
}
