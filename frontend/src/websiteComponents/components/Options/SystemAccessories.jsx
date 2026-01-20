import { Wifi, Signal, MonitorPlay, Camera, ShieldAlert } from "lucide-react";
import Heading2 from "../Common/Headings/Heading2";

const appliances = [
  {
    title: "Starlink Maritime",
    description:
      "Ensures strong internet connectivity in remote or off-grid areas.",
    icon: Wifi,
    image: "/systemChoice/Maritime Starlink.jpg",
  },
  {
    title: "WeBoost Antenna",
    description:
      "Boosts mobile connectivity on the road and enhances cell phone signals in weak-signal areas.",
    icon: Signal,
    image: "/systemChoice/WeBoost Antenna.jpg",
  },
  {
    title: "Detachable Projector Screen",
    description:
      "Provides entertainment during downtime inside the campervan.",
    icon: MonitorPlay,
    image: "/systemChoice/detachable projector screen.png",
  },
  {
    title: "Backup Camera",
    description:
      "Helps with safe parking and reversing in tight spaces.",
    icon: Camera,
    image: "/systemChoice/camera.jpg",
  },
  {
    title: "Fire Extinguisher & Smoke Detector",
    description:
      "Ensures safety in case of fire or emergency situations.",
    icon: ShieldAlert,
    image: "/systemChoice/smoke detector.png",
  },
];

export default function OtherElectricalAppliances() {
  return (
    <section className="py-10">
        <Heading2 text="Other Electrical Appliances" className="text-center my-10"/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appliances.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="rounded-2xl overflow-hidden border bg-white shadow-md hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
