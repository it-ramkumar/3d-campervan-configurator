import React from "react";

const VanDetails = () => {
  const van = {
    _id: "68dfbd7d84fe04fa940ada46",
    slug: "santa-monika",
    vanlisting: {
      title: "santa monika",
      description: "sdfsdfsfsfsdf",
      subtitle: "",
      model_name: "122",
      price: 332423,
      status: "available",
      tagline: "",
      specifications: {
        make_model: "eqweqwe",
        wheelbase: "323",
        drivetrain: "adada",
        engine: "dadadad",
        capacity: {
          sits: "3",
          sleeps: "8",
          _id: "68dfbd7d84fe04fa940ada49"
        },
        id: "68dfbd7d84fe04fa940ada48"
      },
      _id: "68dfbd7d84fe04fa940ada47"
    },
    sold: false,
    gallery: [
      { url: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493500/vans/zpmllgwzhdr8nuu9vzki.png", caption: "", id: "68dfbd7d84fe04fa940ada4a" },
      { url: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493500/vans/mn89f8dnqxbaibww8vcv.png", caption: "", id: "68dfbd7d84fe04fa940ada4b" },
      { url: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493500/vans/ivst9gudgeq9dp3tnsal.png", caption: "", id: "68dfbd7d84fe04fa940ada4c" },
      { url: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493500/vans/itkvemgsjz7fg40vgrdp.png", caption: "", id: "68dfbd7d84fe04fa940ada4d" },
      { url: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493500/vans/pjmob2gx9opzcvdgfrim.png", caption: "", id: "68dfbd7d84fe04fa940ada4e" }
    ],
    blocks: [
      { image: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493498/vans/f03lh1likcntaimgis0o.png", caption: "ddsdfsfsdfsfsdf", id: "68dfbd7d84fe04fa940ada4f" },
      { image: "https://res.cloudinary.com/dssg80hun/image/upload/v1759493499/vans/wfmsxbr4gdny8xupjuj0.png", caption: "efefwefdsfsfs", id: "68dfbd7d84fe04fa940ada50" }
    ],
    feature_highlights: [
      { title: "dadadadadasdadasda", description: "dasdadasd", id: "68dfbd7d84fe04fa940ada51" },
      { title: "fdfdsfsfsdf", description: "ssfsffsfds", id: "68dfbd7d84fe04fa940ada52" }
    ],
    detailed_features: [
      { category: "sdfdsfsdfsdf", items: ["ffsdfsfs", "sfsdfsdf", "sdfsfsdf"], id: "68dfbd7d84fe04fa940ada53" },
      { category: "sfsfsdfsf", items: ["sfdsfsdf", "sdfkjlj", "gfdfdfgdf", "dgdgdfg"], id: "68dfbd7d84fe04fa940ada54" }
    ],
    media: ["sfasdadadadasdad"],
    createdAt: 1759493501719,
    updatedAt: 1759493501719,
    __v: 0
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{van.vanlisting.title}</h1>
            <p className="text-gray-600 mb-4">{van.vanlisting.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-semibold text-gray-900">{van.vanlisting.model_name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold text-green-600">${van.vanlisting.price.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  van.vanlisting.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {van.vanlisting.status}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Sold</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  van.sold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {van.sold ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Specifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Specifications</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Make/Model</span>
                <span className="font-medium">{van.vanlisting.specifications.make_model}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Wheelbase</span>
                <span className="font-medium">{van.vanlisting.specifications.wheelbase}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Drivetrain</span>
                <span className="font-medium">{van.vanlisting.specifications.drivetrain}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Engine</span>
                <span className="font-medium">{van.vanlisting.specifications.engine}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Capacity</span>
                <span className="font-medium">Sits {van.vanlisting.specifications.capacity.sits}, Sleeps {van.vanlisting.specifications.capacity.sleeps}</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Feature Highlights</h2>
            <div className="space-y-4">
              {van.feature_highlights.map((feature) => (
                <div key={feature.id} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Features */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Detailed Features</h2>
            <div className="space-y-6">
              {van.detailed_features.map((feature) => (
                <div key={feature.id}>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.category}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Gallery */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {van.gallery.map((img) => (
                <div key={img.id} className="group relative">
                  <img
                    src={img.url}
                    alt={img.caption || "Van image"}
                    className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <p className="text-white text-sm text-center px-2">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blocks */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Additional Images</h2>
            <div className="space-y-4">
              {van.blocks.map((block) => (
                <div key={block.id} className="border rounded-lg overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.caption || "Block image"}
                    className="w-full h-48 object-cover"
                  />
                  {block.caption && (
                    <div className="p-3 bg-gray-50">
                      <p className="text-gray-600 text-sm">{block.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Media & Meta Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Media & Information</h2>

            {van.media.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Media Links</h3>
                <div className="space-y-2">
                  {van.media.map((m, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-600 truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-700">{new Date(van.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Updated</span>
                <span className="text-gray-700">{new Date(van.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanDetails;