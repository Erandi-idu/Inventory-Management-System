import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { Package, DollarSign, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    // The state to keep the data
    const [stats, setStats] = useState({ 
        totalProducts: 0, 
        totalSales: 0, 
        lowStock: 0 
    });

    useEffect(() => {
        // Let's get stats from the backend.
        API.get('/products/stats')
            .then(res => setStats(res.data))
            .catch(err => console.log("Dashboard Error:", err));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Products Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 font-medium">Total Products</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                    </div>
                    <Package className="text-blue-500 opacity-20" size={48} />
                </div>

                {/* Total Revenue Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 font-medium">Total Revenue</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">Rs. {stats.totalSales}</p>
                    </div>
                    <DollarSign className="text-green-500 opacity-20" size={48} />
                </div>

                {/* Low Stock Items Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500 flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-500 font-medium">Low Stock Items</h3>
                        <p className="text-3xl font-bold text-red-600 mt-2">{stats.lowStock}</p>
                    </div>
                    <AlertTriangle className="text-red-500 opacity-20" size={48} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;