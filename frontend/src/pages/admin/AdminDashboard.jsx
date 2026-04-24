import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Scissors, Receipt, CreditCard, TrendingUp, FileText } from 'lucide-react';
import ManageServices from './ManageServices.jsx';
import ViewBookings from './ViewBookings.jsx';
import ManageProducts from './ManageProducts.jsx';
import ManageCourses from './ManageCourses';
import ManageStock from '../ManageStock';
import ManageStaff from '../ManageStaff';
import Attendance from '../Attendance';
import PaymentVerification from './PaymentVerification';
import Revenue from './Revenue';
import Billing from './Billing';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch {
  user = null;
}

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

const navItems = user?.role === "owner"
  ? [
      { name: 'Staff', path: '/admin/staff', icon: LayoutDashboard },
      { name: 'Attendance', path: '/admin/attendance', icon: LayoutDashboard },
      { name: 'Revenue', path: '/admin/revenue', icon: TrendingUp },
    ]
  : [
      { name: 'Services', path: '/admin/services', icon: Scissors },
      { name: 'Bookings', path: '/admin/bookings', icon: Receipt },
      { name: 'Payments', path: '/admin/payments', icon: CreditCard },
      { name: 'Products', path: '/admin/products', icon: LayoutDashboard },
      { name: 'Courses', path: '/admin/courses', icon: LayoutDashboard },
      { name: 'Stock', path: '/admin/stock', icon: LayoutDashboard },
      { name: 'Billing', path: '/admin/billing', icon: FileText },
    ];

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold heading-luxury text-gold-500">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-gold-500 text-black font-semibold'
                  : 'text-gray-300 hover:bg-zinc-900 hover:text-white'
                  }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:hidden">
          <h1 className="text-xl font-bold heading-luxury text-gold-500">Admin Panel</h1>
          <button onClick={handleLogout} className="text-gray-600">
            <LogOut size={24} />
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<div className="p-8 text-center text-gray-500">Select an option from the menu.</div>} />
            <Route path="services" element={<ManageServices />} />
            <Route path="bookings" element={<ViewBookings />} />
            <Route path="payments" element={<PaymentVerification />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="stock" element={<ManageStock />} />
            <Route path="staff" element={<ManageStaff />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="revenue" element={<Revenue />} />
            <Route path="billing" element={<Billing />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
