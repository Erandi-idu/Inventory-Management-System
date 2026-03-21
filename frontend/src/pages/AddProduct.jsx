import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';
import { Save } from 'lucide-react';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: 1 // කලින් phpMyAdmin එකේ හදපු Electronics (id=1) එක ගමු
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products/add', product);
            alert("Product Added Successfully!");
            navigate('/products'); // සේව් වුණාම ලිස්ට් එකට යන්න
        } catch (error) {
            console.error("Error adding product", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Save className="text-blue-600" /> Add New Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Product Name</label>
                        <input type="text" name="name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea name="description" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Price (Rs.)</label>
                            <input type="number" name="price" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Quantity</label>
                            <input type="number" name="stock_quantity" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" required />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;