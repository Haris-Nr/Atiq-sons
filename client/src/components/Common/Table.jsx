import React, { useState } from 'react'
import { FaPlus, FaFileExport, FaSearch } from 'react-icons/fa';

const initialData = [
  {
    id: 1,
    productName: 'Product A',
    link: 'https://example.com/productA',
    asinNo: 'ASIN001',
    sellerName: 'Seller 1',
    date: '2023-10-30',
    status: 'Active',
  },
  // Add more data here...
];

const itemsPerPage = 10;

const Table = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = initialData.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products"
              className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute top-3 right-4">
              <FaSearch />
            </span>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
              <FaPlus className="mr-1" /> Add Product
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              <FaFileExport className="mr-1" /> Export
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border">Product Name</th>
              <th className="border">Link</th>
              <th className="border">ASIN No</th>
              <th className="border">Seller Name</th>
              <th className="border">Date</th>
              <th className="border">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((product) => (
              <tr key={product.id}>
                <td className="border">{product.productName}</td>
                <td className="border">
                  <a href={product.link} className="text-blue-500 underline">
                    {product.link}
                  </a>
                </td>
                <td className="border">{product.asinNo}</td>
                <td className="border">{product.sellerName}</td>
                <td className="border">{product.date}</td>
                <td className="border">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`px-3 py-1 mx-1 cursor-pointer ${
                index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
              } rounded`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Table