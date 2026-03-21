import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import { ShoppingCart } from 'lucide-react';

const Sales = () => {
    const [products, setProducts] = useState([]);
    const [sale, setSale] = useState({ product_id: '', quantity_sold: '' });
    const [salesHistory, setSalesHistory] = useState([]);

    // Functions ටික මුලින්ම ලියමු
    const fetchProducts = async () => {
        try {
            const res = await API.get('/products/all');
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    const fetchSales = async () => {
        try {
            const res = await API.get('/sales/all');
            setSalesHistory(res.data);
        } catch (err) {
            console.error("Error fetching sales", err);
        }
    };

    // පිටුව Load වෙද්දී functions call කරමු
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
        fetchSales();
    }, []);

    const handleSale = async (e) => {
        e.preventDefault();
        try {
            await API.post('/sales/add', {
                product_id: parseInt(sale.product_id),
                quantity_sold: parseInt(sale.quantity_sold)
            });
            alert("Sale Recorded and Stock Updated!");
            setSale({ product_id: '', quantity_sold: '' });
            fetchProducts(); 
            fetchSales();    
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Form */}
            <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="text-green-600" /> Record a Sale
                </h2>
                <form onSubmit={handleSale} className="space-y-4">
                    <select 
                        className="w-full p-3 border rounded-lg outline-none"
                        value={sale.product_id}
                        onChange={(e) => setSale({...sale, product_id: e.target.value})}
                        required
                    >
                        <option value="">Select Product</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock_quantity})</option>
                        ))}
                    </select>
                    <input 
                        type="number" 
                        placeholder="Quantity to Sell" 
                        className="w-full p-3 border rounded-lg outline-none"
                        value={sale.quantity_sold}
                        onChange={(e) => setSale({...sale, quantity_sold: e.target.value})}
                        required
                    />
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition">
                        Complete Sale
                    </button>
                </form>
            </div>

            {/* Sales History Table */}
            <div className="bg-white p-6 rounded-2xl shadow-md border">
                <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-2">Item</th>
                                <th className="p-2">Qty</th>
                                <th className="p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y text-gray-700">
                            {salesHistory.map(s => (
                                <tr key={s.id}>
                                    <td className="p-2">{s.name}</td>
                                    <td className="p-2">{s.quantity_sold}</td>
                                    <td className="p-2 text-green-600 font-bold">Rs. {s.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Sales;