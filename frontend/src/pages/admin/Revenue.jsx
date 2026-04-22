import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

const Revenue = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, chennai: 0, madurai: 0 });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        // Get all bookings that are Successful (they have bills)
        const res = await axios.get(`${API}/api/bookings`);
        const successful = res.data.filter(b => b.status === 'Successful');
        
        const totalRevenue = successful.reduce((sum, b) => sum + b.total, 0);
        const chennai = successful.filter(b => b.branch === 'Chennai').reduce((sum, b) => sum + b.total, 0);
        const madurai = successful.filter(b => b.branch === 'Madurai').reduce((sum, b) => sum + b.total, 0);
        
        setBills(successful);
        setStats({ total: totalRevenue, chennai, madurai });
      } catch (err) {
        console.error('Failed to fetch revenue', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  if (loading) return <div className="text-center py-10">Loading revenue data...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 heading-luxury mb-6">Revenue Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.total.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">{bills.length} successful bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Chennai Branch</div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.chennai.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">{bills.filter(b => b.branch === 'Chennai').length} bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Madurai Branch</div>
          <div className="text-3xl font-bold text-gray-900">₹{stats.madurai.toLocaleString()}</div>
          <div className="text-xs text-gray-400 mt-1">{bills.filter(b => b.branch === 'Madurai').length} bookings</div>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Mode</th>
                <th className="p-4">Total</th>
                <th className="p-4 pr-6">Bill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No revenue data yet. Revenue is added when bookings are accepted.</td></tr>
              ) : bills.map(b => (
                <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 text-sm text-gray-600">
                    {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400">{b.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">{b.branch}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">UPI</td>
                  <td className="p-4">
                    <span className="font-bold text-gray-900">₹{b.total.toFixed(2)}</span>
                  </td>
                  <td className="p-4 pr-6">
                    {b.billId ? (
                      <a
                        href={`/bill/${b.billId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-black text-gold-500 text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors inline-block"
                      >
                        View Bill
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
