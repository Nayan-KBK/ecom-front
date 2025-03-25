import React, { useState } from 'react';
import { Upload, Button, Form, Input, Select, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    setFile(fileList[0]?.originFileObj || null);
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) formErrors.name = 'Name is required';
    if (!tags.trim()) formErrors.tags = 'Tags are required';
    if (!category) formErrors.category = 'Category is required';
    if (!subCategory) formErrors.subCategory = 'Sub-category is required';
    if (!price) formErrors.price = 'Price is required';
    if (!file) formErrors.file = 'Please upload a ZIP file';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, tags, category, subCategory, price, file });
    message.success('File uploaded successfully!');
    
    // Reset form after submission
    setName('');
    setTags('');
    setCategory('');
    setSubCategory('');
    setPrice('');
    setFile(null);
  };

  return (
    <div className="max-w-[100vw,] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Design</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropzone for File Upload - Wide and at the top */}
        <div className="mb-6 ">
          <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
            Upload ZIP File
          </label>
          <Upload
            beforeUpload={(file) => {
              const isZip = file.type === 'application/zip';
              if (!isZip) {
                message.error('You can only upload ZIP file!');
              }
              return isZip;
            }}
            onChange={handleFileChange}
            showUploadList={false} // Hide default file list
          >
            <div className="border-dashed border-2 p-10 rounded-xl cursor-pointer text-center bg-gray-50">
              <UploadOutlined className="text-4xl mb-4 text-gray-600" />
              <p className="text-gray-500">Drag and drop your ZIP file here, or click to select a file</p>
            </div>
          </Upload>
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter design name"
            className="mt-1 block w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">
            Tags
          </label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (e.g., graphic, logo, design)"
            className="mt-1 block w-full p-2 border rounded"
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <Select
            id="category"
            value={category}
            onChange={(value) => setCategory(value)}
            className="w-full mt-1"
            placeholder="Select a category"
          >
            <Option value="logo">Logo Design</Option>
            <Option value="website">Website Design</Option>
            <Option value="print">Print Design</Option>
          </Select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Sub-Category */}
        <div className="mb-4">
          <label htmlFor="subCategory" className="block text-sm font-semibold text-gray-700">
            Sub-Category
          </label>
          <Select
            id="subCategory"
            value={subCategory}
            onChange={(value) => setSubCategory(value)}
            className="w-full mt-1"
            placeholder="Select a sub-category"
          >
            <Option value="modern">Modern</Option>
            <Option value="vintage">Vintage</Option>
            <Option value="minimal">Minimal</Option>
          </Select>
          {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
            Price
          </label>
          <InputNumber
            id="price"
            value={price}
            onChange={(value) => setPrice(value)}
            placeholder="Enter price"
            className="w-full mt-1"
            min={0}
            step={0.01}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <Button type="primary" htmlType="submit" className="w-full mt-4">
          Upload Design
        </Button>
      </form>
    </div>
  );
};

export default UploadComponent;
