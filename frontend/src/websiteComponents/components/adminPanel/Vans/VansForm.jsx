"use client"
import React, { useState, useEffect } from 'react';
import { createVan, updateVan } from '../../../../api/van/createVan';
import { useSelector } from 'react-redux';

const VansForm = () => {
  const editData = useSelector((state) => state.editData.editData);
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState({
    van_listing: {
      title: '',
      description: '',
      subtitle: '',
      model_name: '',
      price: '',
      status: '',
      tagline: '',
      specifications: {
        make_model: '',
        wheelbase: '',
        drivetrain: '',
        engine: '',
        capacity: { sits: '', sleeps: '' }
      }
    },
    sold: false,
    gallery: [],
    feature_highlights: [{ title: '', description: '' }],
    detailed_features: [{ category: '', items: [''] }],
    media: ['']
  });

  const [blocks, setBlocks] = useState([{ image: null, caption: "", preview: null }]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Prefill when editData exists
  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        van_listing: {
          ...editData.van_listing,
          specifications: {
            ...editData.van_listing?.specifications,
            capacity: {
              ...editData.van_listing?.specifications?.capacity
            }
          }
        },
        feature_highlights: editData.feature_highlights || [{ title: '', description: '' }],
        detailed_features: editData.detailed_features || [{ category: '', items: [''] }],
        media: editData.media || [''],
        gallery: []
      });

      if (editData.blocks?.length) {
        setBlocks(editData.blocks.map((b) => ({
          caption: b.caption,
          image: null,
          preview: b.image
        })));
      }
    }
  }, [editData]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'title':
        if (!value.trim()) newErrors.title = 'Title is required';
        else delete newErrors.title;
        break;
      case 'price':
        if (value && value < 0) newErrors.price = 'Price must be positive';
        else delete newErrors.price;
        break;
      case 'media':
        if (value && !value.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)) {
          newErrors.media = 'Please enter a valid YouTube URL';
        } else delete newErrors.media;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, path) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    validateField(name, value);

    if (path) {
      const pathParts = path.split('.');
      setFormData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        let current = newData;

        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }

        current[pathParts[pathParts.length - 1]] = {
          ...current[pathParts[pathParts.length - 1]],
          [name]: fieldValue
        };

        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: fieldValue
      }));
    }
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...blocks];

    if (field === 'image' && value) {
      const preview = URL.createObjectURL(value);
      newBlocks[index] = { ...newBlocks[index], image: value, preview };
    } else {
      newBlocks[index][field] = value;
    }

    setBlocks(newBlocks);
  };

  const addBlock = () => setBlocks([...blocks, { image: null, caption: "", preview: null }]);

  const removeBlock = (index) => {
    if (blocks[index].preview) URL.revokeObjectURL(blocks[index].preview);
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles([...galleryFiles, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setGalleryPreviews([...galleryPreviews, ...previews]);
  };

  const removeGalleryImage = (index) => {
    URL.revokeObjectURL(galleryPreviews[index]);
    setGalleryFiles(galleryFiles.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const addArrayItem = (field, newItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleArrayItemChange = (field, index, key, value) => {
    setFormData(prev => {
      const updatedArray = [...prev[field]];
      if (key) {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      } else {
        updatedArray[index] = value;
      }
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      const blockData = blocks.map((block, i) => ({
        index: i,
        caption: block.caption,
      }));

      formDataToSend.append("blocksData", JSON.stringify(blockData));
      blocks.forEach((block) => {
        if (block.image) formDataToSend.append("blockImages", block.image);
      });

      formDataToSend.append("van_listing", JSON.stringify(formData.van_listing));
      formDataToSend.append("sold", formData.sold);
      formDataToSend.append("feature_highlights", JSON.stringify(formData.feature_highlights));
      formDataToSend.append("detailed_features", JSON.stringify(formData.detailed_features));
      formDataToSend.append("media", JSON.stringify(formData.media));

      galleryFiles.forEach((file) => formDataToSend.append("gallery", file));

       if (editData?._id) {
    await updateVan(editData, formDataToSend);
  } else {
    await createVan(formDataToSend);
  }

    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error creating/updating van. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const navigationSections = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'specs', label: 'Specifications', icon: '⚙️' },
    { id: 'features', label: 'Features', icon: '⭐' },
    { id: 'media', label: 'Media', icon: '📷' },
    { id: 'blocks', label: 'Content Blocks', icon: '🧱' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {editData ? 'Edit Van Listing' : 'Create New Van Listing'}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {editData ? 'Update your van details' : 'Fill out the form below to list your van for sale'}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto mb-8 bg-white rounded-xl shadow-sm p-2">
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-3 rounded-lg mx-1 transition-all duration-200 whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          {activeSection === 'basic' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="bg-white/20 p-2 rounded-lg mr-3">🚐</span>
                  Van Basic Information
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title*</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      name="title"
                      value={formData.van_listing.title}
                      onChange={(e) => handleInputChange(e, 'van_listing')}
                      required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="model_name"
                      value={formData.van_listing.model_name}
                      onChange={(e) => handleInputChange(e, 'van_listing')}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                    name="description"
                    value={formData.van_listing.description}
                    onChange={(e) => handleInputChange(e, 'van_listing')}
                    placeholder="Describe your van's features and condition..."
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        name="price"
                        value={formData.van_listing.price}
                        onChange={(e) => handleInputChange(e, 'van_listing')}
                      />
                    </div>
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="status"
                      value={formData.van_listing.status}
                      onChange={(e) => handleInputChange(e, 'van_listing')}
                    >
                      <option value="">Select status</option>
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specifications Section */}
          {activeSection === 'specs' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="bg-white/20 p-2 rounded-lg mr-3">📊</span>
                  Technical Specifications
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Make & Model</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="make_model"
                      value={formData.van_listing.specifications.make_model}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wheelbase</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="wheelbase"
                      value={formData.van_listing.specifications.wheelbase}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Drivetrain</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="drivetrain"
                      value={formData.van_listing.specifications.drivetrain}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Engine</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="engine"
                      value={formData.van_listing.specifications.engine}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sits</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="sits"
                      value={formData.van_listing.specifications.capacity.sits}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications.capacity')}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sleeps</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      name="sleeps"
                      value={formData.van_listing.specifications.capacity.sleeps}
                      onChange={(e) => handleInputChange(e, 'van_listing.specifications.capacity')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          {activeSection === 'features' && (
            <div className="space-y-6">
              {/* Feature Highlights */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="bg-white/20 p-2 rounded-lg mr-3">⭐</span>
                    Feature Highlights
                  </h3>
                </div>
                <div className="p-8 space-y-6">
                  {formData.feature_highlights.map((feature, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold text-gray-900">Feature #{index + 1}</h5>
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          onClick={() => removeArrayItem('feature_highlights', index)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={feature.title}
                            onChange={(e) => handleArrayItemChange('feature_highlights', index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                            value={feature.description}
                            onChange={(e) => handleArrayItemChange('feature_highlights', index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                    onClick={() => addArrayItem('feature_highlights', { title: '', description: '' })}
                  >
                    <span className="text-blue-500 mr-2">+</span>
                    Add Feature Highlight
                  </button>
                </div>
              </div>

              {/* Detailed Features */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="bg-white/20 p-2 rounded-lg mr-3">🔧</span>
                    Detailed Features
                  </h3>
                </div>
                <div className="p-8 space-y-6">
                  {formData.detailed_features.map((feature, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold text-gray-900">Category #{index + 1}</h5>
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          onClick={() => removeArrayItem('detailed_features', index)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={feature.category}
                            onChange={(e) => handleArrayItemChange('detailed_features', index, 'category', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Items (comma separated)</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={feature.items.join(', ')}
                            onChange={(e) => handleArrayItemChange('detailed_features', index, 'items', e.target.value.split(',').map(item => item.trim()))}
                          />
                          <p className="mt-2 text-sm text-gray-500">Separate items with commas</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center"
                    onClick={() => addArrayItem('detailed_features', { category: '', items: [''] })}
                  >
                    <span className="text-purple-500 mr-2">+</span>
                    Add Feature Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Media Section */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              {/* Video Links */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 bg-gradient-to-r from-red-500 to-pink-500 text-white">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="bg-white/20 p-2 rounded-lg mr-3">🎥</span>
                    Video Links
                  </h3>
                </div>
                <div className="p-8 space-y-4">
                  {formData.media.map((link, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="text"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={link}
                        onChange={(e) => handleArrayItemChange('media', index, null, e.target.value)}
                      />
                      <button
                        type="button"
                        className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
                        onClick={() => removeArrayItem('media', index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                    onClick={() => addArrayItem('media', '')}
                  >
                    <span className="text-red-500 mr-2">+</span>
                    Add Video Link
                  </button>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <span className="bg-white/20 p-2 rounded-lg mr-3">📷</span>
                    Gallery Images
                  </h3>
                </div>
                <div className="p-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-200">
                    <input
                      type="file"
                      multiple
                      onChange={handleGalleryChange}
                      className="hidden"
                      id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload" className="cursor-pointer">
                      <div className="text-6xl mb-4">📁</div>
                      <p className="text-lg font-semibold text-gray-700">Click to upload images</p>
                      <p className="text-gray-500">or drag and drop</p>
                      <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>

                  {galleryPreviews.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold mb-4">Selected Images</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Blocks Section */}
          {activeSection === 'blocks' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                <h3 className="text-2xl font-semibold flex items-center">
                  <span className="bg-white/20 p-2 rounded-lg mr-3">🧱</span>
                  Content Blocks
                </h3>
              </div>
              <div className="p-8 space-y-6">
                {blocks.map((block, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-lg font-semibold text-gray-900">Block #{index + 1}</h5>
                      <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        onClick={() => removeBlock(index)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBlockChange(index, "image", e.target.files[0])}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {block.preview && (
                        <div className="mt-2">
                          <img
                            src={block.preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                        <input
                          type="text"
                          placeholder="Enter caption for this block"
                          value={block.caption}
                          onChange={(e) => handleBlockChange(index, "caption", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addBlock}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center"
                >
                  <span className="text-indigo-500 mr-2">+</span>
                  Add Content Block
                </button>
              </div>
            </div>
          )}

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <input
                  id="sold"
                  name="sold"
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={formData.sold}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="sold" className="text-lg font-medium text-gray-900">
                  Mark as sold
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editData ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  editData ? 'Update Van Listing' : 'Create Van Listing'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VansForm;