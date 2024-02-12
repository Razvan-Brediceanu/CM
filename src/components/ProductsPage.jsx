import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backImage from '../images/LoginRegister2.jpg'

const ProductsPage = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [priceFilter, setPriceFilter] = useState('')
  const productsPerPage = 9

  const products = [
    {
      title: 'Product 1',
      description: 'Description for Product 1',
      imageUrl: 'https://via.placeholder.com/150',
      price: 19.99,
    },
    {
      title: 'Product 2',
      description: 'Description for Product 2',
      imageUrl: 'https://via.placeholder.com/150',
      price: 29.99,
    },
    {
      title: 'Product 3',
      description: 'Description for Product 3',
      imageUrl: 'https://via.placeholder.com/150',
      price: 39.99,
    },
    {
      title: 'Product 4',
      description: 'Description for Product 4',
      imageUrl: 'https://via.placeholder.com/150',
      price: 49.99,
    },
    {
      title: 'Product 5',
      description: 'Description for Product 5',
      imageUrl: 'https://via.placeholder.com/150',
      price: 59.99,
    },
    {
      title: 'Product 6',
      description: 'Description for Product 6',
      imageUrl: 'https://via.placeholder.com/150',
      price: 69.99,
    },
    {
      title: 'Product 7',
      description: 'Description for Product 7',
      imageUrl: 'https://via.placeholder.com/150',
      price: 79.99,
    },
    {
      title: 'Product 8',
      description: 'Description for Product 8',
      imageUrl: 'https://via.placeholder.com/150',
      price: 89.99,
    },
    {
      title: 'Product 9',
      description: 'Description for Product 9',
      imageUrl: 'https://via.placeholder.com/150',
      price: 99.99,
    },
    {
      title: 'Product 10',
      description: 'Description for Product 10',
      imageUrl: 'https://via.placeholder.com/150',
      price: 109.99,
    },
  ]

  // Apply price filter if set
  const filteredProducts = priceFilter
    ? products.filter((product) => product.price <= priceFilter)
    : products

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const handleViewDetails = (product) => {
    navigate(`/product-details/${product.title}`)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handlePriceFilterChange = (e) => {
    setPriceFilter(parseFloat(e.target.value))
  }

  return (
    <div
      className='relative min-h-screen bg-cover'
      style={{ backgroundImage: `url(${backImage})` }}
    >
      <div className='absolute left-1/2 transform -translate-x-1/2 container mx-auto px-4 lg:px-8 font-bold your-permanent-marker-text sm:mt-15'>
        <h2 className='text-3xl font-bold mb-8 lg:mb-20 text-center sm:mb-16 md:mb-20 lg:mb-24'>
          Produsele noastre
        </h2>
        {/* Price filter */}
        <div className='mb-4'>
          <label htmlFor='priceFilter' className='mr-2'>
            Filter by Price:
          </label>
          <select
            id='priceFilter'
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className='border rounded px-2 py-1'
          >
            <option value=''>Select Price Range</option>
            <option value='50'>$50 or less</option>
            <option value='100'>$100 or less</option>
            <option value='150'>$150 or less</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {/* Products */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:mx-2 lg:mx-0'>
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className='bg-white p-4 sm:p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 border border-gray-300'
            >
              <h3 className='text-xl font-semibold mb-2'>{product.title}</h3>
              <img
                src={product.imageUrl}
                alt={product.title}
                className='mb-4'
                style={{ width: '100%' }}
              />
              <p className='text-gray-600 mb-4'>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-2'
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className='mt-8 flex justify-center'>
          {[
            ...Array(
              Math.ceil(filteredProducts.length / productsPerPage)
            ).keys(),
          ].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`mr-2 focus:outline-none ${
                currentPage === number + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              } px-4 py-2 rounded-full`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
