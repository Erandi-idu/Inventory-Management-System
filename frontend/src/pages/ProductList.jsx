import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await API.delete(`/products/delete/${id}`);
            setProducts(products.filter(p => p.id !== id)); // List එකෙන් අයින් කරන්න
            alert("Product Deleted!");
        } catch (err) {
            console.error(err);
        }
    }
};

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-4">Product Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{p.name}</td>
                <td className="p-4 text-gray-600">Rs. {p.price}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded-full text-xs ${p.stock_quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {p.stock_quantity} in stock
                   </span>
                </td>
                <td className="p-4 text-center">
                  <button className="text-blue-600 hover:underline mr-4">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;