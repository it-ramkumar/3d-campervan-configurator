export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-3 text-brand font-medium">Loading 3D Model...</p>
    </div>
  );
}