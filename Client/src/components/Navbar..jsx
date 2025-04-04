import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Menu icons

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-teal-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Logo */}
                        <div className="text-white font-bold text-xl">
                            userProfile
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <Link to="/" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/products" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                                Products
                            </Link>
                            <Link to="/register" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                                Register
                            </Link>
                            <Link to="/login" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                                Login
                            </Link>
                            
                            <Link to="/cart" className="text-white hover:bg-teal-700 px-3 py-2 rounded-md text-sm font-medium">
                                Cart
                            </Link>
                            
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="md:hidden bg-teal-700 px-4 py-3 space-y-2">
                        <Link to="/" className="block text-white hover:bg-teal-800 px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link to="/products" className="block text-white hover:bg-teal-800 px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                            Products
                        </Link>
                        <Link to="/register" className="block text-white hover:bg-teal-800 px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                            Register
                        </Link>
                        <Link to="/login" className="block text-white hover:bg-teal-800 px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                       
                        <Link to="/cart" className="block text-white hover:bg-teal-800 px-4 py-2 rounded-md text-sm font-medium" onClick={() => setIsOpen(false)}>
                            Cart
                        </Link>
                        
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
