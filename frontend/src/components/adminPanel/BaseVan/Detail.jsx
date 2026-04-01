import React from 'react';
import { X, Ruler, HardDrive, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';

export default function Detail({ van, onClose }) {
  if (!van) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Image Section */}
          <div className="md:w-1/2 h-64 md:h-auto bg-gray-100">
            <Image
              src={van?.imgUrl}
              alt={van?.layout}
              className="w-full h-full object-cover"
              width={400}
              height={300}
    
            />
          </div>

          {/* Right: Info Section */}
          <div className="md:w-1/2 p-8">
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">Base Van Details</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{van?.layout}</h2>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{van?.shortDescription}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Ruler size={16} />
                </div>
                <span><strong>Wheelbase:</strong> {van?.spec?.wheelBase}"</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                  <HardDrive size={16} />
                </div>
                <span><strong>Drivetrain:</strong> {van?.spec?.drivetrain}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <Users size={16} />
                </div>
                <span><strong>Capacity:</strong> {van?.spec?.sitSleep} Seats/Beds</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 font-bold">
                <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600">
                  <DollarSign size={16} />
                </div>
                <span className="text-lg">Price: ${van?.price?.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => window.open(van.glbFileUrl, '_blank')}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-all shadow-lg shadow-gray-200"
            >
              Test 3D View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}