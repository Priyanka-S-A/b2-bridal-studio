import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../animations/variants';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusColors = {
  Pending: { bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.3)', color: '#eab308' },
  Successful: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#22c55e' },
  Rejected: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', color: '#ef4444' },
};

const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user?.email) { setLoading(false); return; }
    fetch(`${API}/api/bookings/user/${user.email}`)
      .then(r => r.json())
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!user) {
    return (
      <div style={{ background: '#000', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="text-center px-6">
          <span className="text-5xl block mb-6">🔒</span>
          <h2 className="font-cinzel text-lg tracking-[0.1em] uppercase mb-3" style={{ color: '#F8F5F0' }}>Please Login</h2>
          <p className="font-cormorant italic mb-6" style={{ color: 'rgba(248,245,240,0.4)' }}>Login to view your bookings and order history.</p>
          <Link to="/login" className="btn-gold py-3 px-8 text-xs">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: '9rem 0 4rem' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center top, rgba(201,162,39,0.06), transparent 60%)' }} />
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A227)' }} />
            <span className="font-cinzel text-[0.6rem] tracking-[0.5em] uppercase" style={{ color: '#C9A227' }}>My Account</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C9A227, transparent)' }} />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-cinzel font-bold uppercase" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F8F5F0', letterSpacing: '0.05em' }}>
            Welcome, {user.name}
          </motion.h1>
          <motion.p variants={fadeUp} className="font-cormorant italic mt-3" style={{ fontSize: '1.1rem', color: 'rgba(248,245,240,0.5)' }}>
            {user.email}
          </motion.p>
        </motion.div>
      </section>

      {/* Bookings */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-cinzel text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#C9A227' }}>Your Bookings</h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid rgba(201,162,39,0.2)', borderTopColor: '#C9A227' }} />
            </div>
          ) : bookings.length === 0 ? (
            <div className="glass-dark p-12 rounded-sm text-center" style={{ border: '1px solid rgba(201,162,39,0.1)' }}>
              <span className="text-4xl block mb-4">📋</span>
              <h3 className="font-cinzel text-sm tracking-[0.1em] uppercase mb-2" style={{ color: '#F8F5F0' }}>No Bookings Yet</h3>
              <p className="font-cormorant italic mb-6" style={{ color: 'rgba(248,245,240,0.4)' }}>You haven't made any bookings yet.</p>
              <Link to="/services" className="btn-outline-gold py-2 px-6 text-xs">Browse Services</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking, i) => {
                const sc = statusColors[booking.status] || statusColors.Pending;
                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-dark rounded-sm overflow-hidden"
                    style={{ border: '1px solid rgba(201,162,39,0.12)' }}
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-cinzel text-[0.5rem] tracking-[0.2em] uppercase px-3 py-1 rounded-sm" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                            {booking.status}
                          </span>
                          <span className="font-cinzel text-[0.5rem] tracking-[0.15em] uppercase px-3 py-1" style={{ background: 'rgba(201,162,39,0.06)', color: 'rgba(201,162,39,0.5)', border: '1px solid rgba(201,162,39,0.1)' }}>
                            {booking.branch}
                          </span>
                        </div>
                        <span className="font-cormorant italic text-xs" style={{ color: 'rgba(248,245,240,0.35)' }}>
                          {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="mb-4">
                        {booking.items.map((item, j) => (
                          <div key={j} className="flex justify-between py-1.5 text-sm" style={{ borderBottom: j < booking.items.length - 1 ? '1px solid rgba(201,162,39,0.04)' : 'none' }}>
                            <span className="font-cormorant" style={{ color: 'rgba(248,245,240,0.65)' }}>{item.quantity || 1}x {item.name}</span>
                            <span className="font-cinzel text-xs" style={{ color: 'rgba(201,162,39,0.5)' }}>₹{item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(201,162,39,0.08)' }}>
                        <div>
                          <span className="font-cinzel text-[0.5rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(248,245,240,0.35)' }}>Transaction: </span>
                          <span className="font-inter text-xs" style={{ color: 'rgba(248,245,240,0.5)' }}>{booking.transactionId}</span>
                        </div>
                        <span className="font-cinzel text-base font-bold" style={{ color: '#C9A227' }}>₹{booking.total.toFixed(2)}</span>
                      </div>

                      {/* Bill link */}
                      {booking.status === 'Successful' && booking.billId && (
                        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(201,162,39,0.08)' }}>
                          <Link to={`/bill/${booking.billId}`} className="font-cinzel text-[0.6rem] tracking-[0.2em] uppercase flex items-center gap-2" style={{ color: '#C9A227' }}>
                            View Bill
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"><path d="M1 4h10M7 1l4 3-4 3"/></svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
