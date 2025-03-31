import React, { useState } from 'react';
import { Upload, Button, Input, Select, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  // const [jpgFile, setJpgFile] = useState(null);
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);








  const validateFileType = (file) => {
    console.log('Validating file:', file); // Debugging line to see file details

    // Check if file type is ZIP or if file extension ends with .zip
    const isZip = file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip');
    console.log('Is Valid Type (ZIP):', isZip); // Debugging line to check if file is a ZIP

    // If it's not a ZIP file
    if (!isZip) {
      alert("You can only upload ZIP files!"); // Alert user
      message.error('You can only upload ZIP files!');
      return false; // Reject the file if it's not a ZIP
    }

    // Check for ZIP file size limit (e.g., 10MB max)
    if (file.size > 10 * 1024 * 1024) { // 10MB
      message.error('ZIP file must be smaller than 10MB');
      return false; // Reject if ZIP file is too large
    }

    return true; // Allow upload if it's a valid ZIP file
  };

  // Handle before file upload
  const beforeUpload = (file, fileList) => {
    console.log('beforeUpload file:', file); // Debugging line to inspect file
    console.log('beforeUpload fileList:', fileList); // Debugging line to inspect file list

    // Ensure only one file is uploaded at a time
    if (fileList.length > 1) {
      message.error('You can only upload one file at a time!');
      return false; // Reject the file if more than one is selected
    }

    // Validate the file type and size
    const isValid = validateFileType(file);
    if (isValid) {
      return false; // Prevent upload if file is invalid
    }

    return true; // Allow upload if it's a valid file
  };




  
  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    // Check if a file is selected, update the state
    const newFile = fileList[0]?.originFileObj || null;
    setFile(newFile);

    // Clear file error if file is selected
    if (newFile) {
      setErrors((prevErrors) => {
        const { file, ...rest } = prevErrors; // Remove file error
        return rest;
      });
    }
  };

  // Handle JPG file upload
  // const handleJpgChange = ({ fileList }) => {
  //   setJpgFile(fileList[0]?.originFileObj || null);
  // };

  // Validation function
  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) formErrors.name = 'Name is required';
    if (!tags.trim()) formErrors.tags = 'Tags are required';
    if (!category) formErrors.category = 'Category is required';
    if (!subCategory) formErrors.subCategory = 'Sub-category is required';
    if (!price) formErrors.price = 'Price is required';
    if (!file) formErrors.file = 'Please upload a ZIP file'; // Validate file
    // if (!jpgFile) formErrors.jpgFile = 'Please upload a JPG file'; // Validate JPG file

    setErrors(formErrors); // Update errors state
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      console.log("Form is invalid", errors);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('file', file); // Append the file
    // formData.append('jpgFile', jpgFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        message.success('File uploaded successfully!');
        // Reset form after successful upload
        setName('');
        setTags('');
        setCategory('');
        setSubCategory('');
        setPrice('');
        setFile(null);
        // setJpgFile(null);
      } else {
        message.error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('File upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 













  return (
    <div className="max-w-[100vw] mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Design</h2>
      <form onSubmit={handleSubmit}>
        {/* Upload ZIP File */}
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
            Upload ZIP File
          </label>
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            showUploadList={true} // Show file list
            maxCount={1}
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

        <Button type="primary" htmlType="submit" className="w-full mt-4" loading={loading}>
          Upload Design
        </Button>
      </form>
    </div>
  );
};

export default UploadComponent;
