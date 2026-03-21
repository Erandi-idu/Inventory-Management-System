import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400">
          <Package size={24} /> Inventory Pro
        </h1>
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/products" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <Package size={18} /> Products
          </Link>
          <Link to="/sales" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <ShoppingCart size={18} /> Sales
          </Link>
          <Link to="/add-product" className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition">
            <PlusCircle size={18} /> Add New
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;