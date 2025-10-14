"use client"
import React, { useState, useEffect } from 'react';
import { createVan, updateVan } from '../../../../api/van/createVan';
import { useSelector } from 'react-redux';

const VansForm = () => {
  const editData = useSelector((state) => state.editData.editData);
  const [formData, setFormData] = useState({
    van_listing: {
      title: '',
      description: '',
      subtitle: '',
      model_name: '',
      price: '',

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

  // Enhanced validation function
  const validateForm = () => {
    const newErrors = {};

    // Basic Information Validation
    if (!formData.van_listing.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.van_listing.model_name?.trim()) newErrors.model_name = 'Model name is required';
    if (!formData.van_listing.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.van_listing.price || formData.van_listing.price < 0) newErrors.price = 'Valid price is required';

    // Specifications Validation
    if (!formData.van_listing.specifications.make_model?.trim()) newErrors.make_model = 'Make/Model is required';
    if (!formData.van_listing.specifications.wheelbase?.trim()) newErrors.wheelbase = 'Wheelbase is required';
    if (!formData.van_listing.specifications.drivetrain?.trim()) newErrors.drivetrain = 'Drivetrain is required';
    if (!formData.van_listing.specifications.engine?.trim()) newErrors.engine = 'Engine is required';
    if (!formData.van_listing.specifications.capacity.sits?.trim()) newErrors.sits = 'Sits capacity is required';
    if (!formData.van_listing.specifications.capacity.sleeps?.trim()) newErrors.sleeps = 'Sleeps capacity is required';

    // Feature Highlights Validation
    formData.feature_highlights.forEach((feature, index) => {
      if (!feature.title?.trim()) newErrors[`feature_title_${index}`] = 'Feature title is required';
      if (!feature.description?.trim()) newErrors[`feature_desc_${index}`] = 'Feature description is required';
    });

    // Detailed Features Validation
    formData.detailed_features.forEach((feature, index) => {
      if (!feature.category?.trim()) newErrors[`detail_category_${index}`] = 'Category is required';
      feature.items.forEach((item, itemIndex) => {
        if (!item?.trim()) newErrors[`detail_item_${index}_${itemIndex}`] = 'Feature item is required';
      });
    });

    // Media Validation
    formData.media.forEach((media, index) => {
      if (!media?.trim()) newErrors[`media_${index}`] = 'Media URL is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, path) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

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

  const addDetailedFeatureItem = (featureIndex) => {
    setFormData(prev => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: [...updatedFeatures[featureIndex].items, '']
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  const removeDetailedFeatureItem = (featureIndex, itemIndex) => {
    setFormData(prev => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.filter((_, i) => i !== itemIndex)
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  const handleDetailedFeatureItemChange = (featureIndex, itemIndex, value) => {
    setFormData(prev => {
      const updatedFeatures = [...prev.detailed_features];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        items: updatedFeatures[featureIndex].items.map((item, i) =>
          i === itemIndex ? value : item
        )
      };
      return { ...prev, detailed_features: updatedFeatures };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill all required fields');
      return;
    }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {editData ? 'Edit Van Listing' : 'Create New Van Listing'}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {editData ? 'Update your van details' : 'Fill out all fields to list your van for sale'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <h3 className="text-2xl font-semibold">🚐 Basic Information</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    name="title"
                    value={formData.van_listing.title}
                    onChange={(e) => handleInputChange(e, 'van_listing')}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Name *</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.model_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    name="model_name"
                    value={formData.van_listing.model_name}
                    onChange={(e) => handleInputChange(e, 'van_listing')}
                  />
                  {errors.model_name && <p className="text-red-500 text-sm mt-1">{errors.model_name}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  name="description"
                  value={formData.van_listing.description}
                  onChange={(e) => handleInputChange(e, 'van_listing')}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    name="price"
                    value={formData.van_listing.price}
                    onChange={(e) => handleInputChange(e, 'van_listing')}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

              
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <h3 className="text-2xl font-semibold">📊 Technical Specifications</h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'make_model', label: 'Make & Model *', error: errors.make_model },
                  { key: 'wheelbase', label: 'Wheelbase *', error: errors.wheelbase },
                  { key: 'drivetrain', label: 'Drivetrain *', error: errors.drivetrain },
                  { key: 'engine', label: 'Engine *', error: errors.engine },
                  { key: 'sits', label: 'Sits Capacity *', error: errors.sits, path: 'van_listing.specifications.capacity' },
                  { key: 'sleeps', label: 'Sleeps Capacity *', error: errors.sleeps, path: 'van_listing.specifications.capacity' }
                ].map(({ key, label, error, path }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        error ? 'border-red-500' : 'border-gray-300'
                      }`}
                      name={key}
                      value={path ?
                        formData.van_listing.specifications.capacity[key] :
                        formData.van_listing.specifications[key]
                      }
                      onChange={(e) => handleInputChange(e, path || 'van_listing.specifications')}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <h3 className="text-2xl font-semibold">⭐ Feature Highlights</h3>
            </div>
            <div className="p-8 space-y-6">
              {formData.feature_highlights.map((feature, index) => (
                <div key={index} className="border border-gray-200 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold">Feature #{index + 1}</h5>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => removeArrayItem('feature_highlights', index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`feature_title_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={feature.title}
                        onChange={(e) => handleArrayItemChange('feature_highlights', index, 'title', e.target.value)}
                      />
                      {errors[`feature_title_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`feature_title_${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] ${
                          errors[`feature_desc_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={feature.description}
                        onChange={(e) => handleArrayItemChange('feature_highlights', index, 'description', e.target.value)}
                      />
                      {errors[`feature_desc_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`feature_desc_${index}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 hover:bg-orange-50"
                onClick={() => addArrayItem('feature_highlights', { title: '', description: '' })}
              >
                + Add Feature Highlight
              </button>
            </div>
          </div>

          {/* Detailed Features */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 className="text-2xl font-semibold">🔧 Detailed Features</h3>
            </div>
            <div className="p-8 space-y-6">
              {formData.detailed_features.map((feature, index) => (
                <div key={index} className="border border-gray-200 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold">Category #{index + 1}</h5>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => removeArrayItem('detailed_features', index)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors[`detail_category_${index}`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={feature.category}
                        onChange={(e) => handleArrayItemChange('detailed_features', index, 'category', e.target.value)}
                      />
                      {errors[`detail_category_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`detail_category_${index}`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Items *</label>
                      {feature.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors[`detail_item_${index}_${itemIndex}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={item}
                            onChange={(e) => handleDetailedFeatureItemChange(index, itemIndex, e.target.value)}
                            placeholder={`Item ${itemIndex + 1}`}
                          />
                          <button
                            type="button"
                            className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
                            onClick={() => removeDetailedFeatureItem(index, itemIndex)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        onClick={() => addDetailedFeatureItem(index)}
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50"
                onClick={() => addArrayItem('detailed_features', { category: '', items: [''] })}
              >
                + Add Feature Category
              </button>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <h3 className="text-2xl font-semibold">🎥 Media Links</h3>
            </div>
            <div className="p-8 space-y-4">
              {formData.media.map((link, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors[`media_${index}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={link}
                    onChange={(e) => handleArrayItemChange('media', index, null, e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
                    onClick={() => removeArrayItem('media', index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-red-500 hover:bg-red-50"
                onClick={() => addArrayItem('media', '')}
              >
                + Add Media Link
              </button>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <h3 className="text-2xl font-semibold">📷 Gallery Images</h3>
            </div>
            <div className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500">
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
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
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

          {/* Content Blocks */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <h3 className="text-2xl font-semibold">🧱 Content Blocks</h3>
            </div>
            <div className="p-8 space-y-6">
              {blocks.map((block, index) => (
                <div key={index} className="border border-gray-200 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-semibold">Block #{index + 1}</h5>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-300"
                      />
                    </div>
                    {block.preview && (
                      <img src={block.preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                      <input
                        type="text"
                        value={block.caption}
                        onChange={(e) => handleBlockChange(index, "caption", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addBlock}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50"
              >
                + Add Content Block
              </button>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
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
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 w-full sm:w-auto"
              >
                {loading ? 'Submitting...' : editData ? 'Update Van Listing' : 'Create Van Listing'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VansForm;