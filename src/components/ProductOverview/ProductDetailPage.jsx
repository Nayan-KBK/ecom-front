import React, { useState } from 'react';



const ProductDetailPage = ({ product }) => {
  // State to handle selected variant
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Handler for variant change
  const handleVariantChange = (event) => {
    const selected = product.variants.find((variant) => variant.name === event.target.value);
    setSelectedVariant(selected);
  };

  

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-12">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-4">{product.description}</p>

          {/* Product Price */}
          <div className="mt-6">
            <span className="text-2xl font-semibold text-gray-900">{selectedVariant.price}</span>
          </div>

          {/* Variant Selector */}
          <div className="mt-4">
            <label htmlFor="variants" className="block text-lg font-medium text-gray-700">
              Choose Variant:
            </label>
            <select
              id="variants"
              value={selectedVariant.name}
              onChange={handleVariantChange}
              className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {product.variants.map((variant) => (
                <option key={variant.name} value={variant.name}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
