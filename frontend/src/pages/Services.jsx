import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Calendar, Clock, Check, Trash2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const groupServicesByCategory = (data) => {
  if (!Array.isArray(data)) return []; // safety

  const grouped = {};

  data.forEach(service => {
    if (!service || !service.category) return; // safety

    if (!grouped[service.category]) {
      grouped[service.category] = [];
    }

    grouped[service.category].push({
      ...service,
      options: service.options || [] // ensure always array
    });
  });

  return Object.keys(grouped).map(category => ({
    category,
    services: grouped[category]
  }));
};

const SERVICE_CATEGORIES = [
  {
    category: 'Threading',
    services: [
      { _id: 't1', name: 'Eye Brows', price: 50 },
      { _id: 't2', name: 'Fore Head', price: 40 },
      { _id: 't3', name: 'Chin & Neck', price: 40 },
      { _id: 't4', name: 'Upper Lip', price: 40 },
      { _id: 't5', name: 'Side Locks', price: 100 },
      { _id: 't6', name: 'Full Face', price: 250 },
    ]
  },
  {
    category: 'Skin Brightening Mask',
    services: [
      { _id: 'm1', name: 'Vitamin C Peel-Off Mask', price: 850 },
      { _id: 'm2', name: 'Glass Skin Mask', price: 750 },
      { _id: 'm3', name: 'Pack Mask', price: 650 },
    ]
  },
  {
    category: 'Detan',
    services: [
      { 
        _id: 'd_face', name: 'Detan - Face', 
        options: [ { _id: 'd1', name: 'Raga', price: 700 }, { _id: 'd2', name: 'Fruit', price: 600 } ]
      },
      { 
        _id: 'd_neck', name: 'Detan - Neck Front & Back', 
        options: [ { _id: 'd3', name: 'Raga', price: 500 }, { _id: 'd4', name: 'Fruit', price: 400 } ]
      },
      { 
        _id: 'd_arms', name: 'Detan - Under Arms', 
        options: [ { _id: 'd5', name: 'Raga', price: 400 }, { _id: 'd6', name: 'Fruit', price: 600 } ]
      },
      { 
        _id: 'd_feet', name: 'Detan - Feet', 
        options: [ { _id: 'd7', name: 'Raga', price: 700 }, { _id: 'd8', name: 'Fruit', price: 600 } ]
      },
    ]
  },
  {
    category: 'Bleach',
    services: [
      { _id: 'b_face', name: 'Bleach - Face', options: [ { _id: 'b1', name: 'Oxy', price: 800 }, { _id: 'b2', name: 'Fruit', price: 600 } ] },
      { _id: 'b_neck', name: 'Bleach - Neck Front & Back', options: [ { _id: 'b3', name: 'Oxy', price: 500 }, { _id: 'b4', name: 'Fruit', price: 400 } ] },
      { _id: 'b_arms', name: 'Bleach - Under Arms', options: [ { _id: 'b5', name: 'Oxy', price: 400 }, { _id: 'b6', name: 'Fruit', price: 300 } ] },
      { _id: 'b_hands', name: 'Bleach - Full Hands', options: [ { _id: 'b7', name: 'Oxy', price: 1000 }, { _id: 'b8', name: 'Fruit', price: 800 } ] },
      { _id: 'b_feet', name: 'Bleach - Feet', options: [ { _id: 'b9', name: 'Oxy', price: 600 }, { _id: 'b10', name: 'Fruit', price: 400 } ] },
      { _id: 'b_leg', name: 'Bleach - Full Leg', options: [ { _id: 'b11', name: 'Oxy', price: 1500 }, { _id: 'b12', name: 'Fruit', price: 1200 } ] },
      { _id: 'b_body', name: 'Bleach - Full Body', options: [ { _id: 'b13', name: 'Oxy', price: 3000 }, { _id: 'b14', name: 'Fruit', price: 2000 } ] },
    ]
  },
  {
    category: 'Pedicure & Manicure',
    services: [
      { _id: 'p_nail', name: 'Nail Cut & File / Polish', options: [ { _id: 'p1', name: 'Feet', price: 150 }, { _id: 'p2', name: 'Hands', price: 150 } ] },
      { _id: 'p_express', name: 'Express', options: [ { _id: 'p3', name: 'Feet', price: 750 }, { _id: 'p4', name: 'Hands', price: 650 } ] },
      { _id: 'p_refresh', name: 'Refresh', options: [ { _id: 'p5', name: 'Feet', price: 950 }, { _id: 'p6', name: 'Hands', price: 850 } ] },
      { _id: 'p_aroma', name: 'Aroma', options: [ { _id: 'p7', name: 'Feet', price: 1200 }, { _id: 'p8', name: 'Hands', price: 900 } ] },
      { _id: 'p_avl', name: 'AVL Express', options: [ { _id: 'p9', name: 'Feet', price: 1300 }, { _id: 'p10', name: 'Hands', price: 1000 } ] },
      { _id: 'p_sika', name: 'Sika Signature', options: [ { _id: 'p11', name: 'Feet', price: 1500 }, { _id: 'p12', name: 'Hands', price: 1200 } ] },
    ]
  },
  {
    category: 'Bridal Services',
    services: [
      { _id: 'br1', name: 'Normal Makeup', price: 10000 },
      { _id: 'br2', name: 'Waterproof / Sweatproof Makeup', price: 15000 },
      { _id: 'br3', name: 'HD Makeup', price: 20000 },
      { _id: 'br4', name: 'Air Brush Makeup', price: 25000 },
      { _id: 'br_saree', name: 'Only Saree Drape', options: [ { _id: 'br5', name: 'Simple', price: 700 }, { _id: 'br6', name: 'Simple Iron & Drape', price: 1000 }, { _id: 'br7', name: 'Ironing & Drape', price: 2000 } ] },
      { _id: 'br_hair', name: 'Hair Do', options: [ { _id: 'br8', name: 'Simple', price: 700 }, { _id: 'br9', name: 'Simple Iron & Drape', price: 1500 }, { _id: 'br10', name: 'Ironing & Drape', price: 2500 } ] },
      { _id: 'br11', name: 'Makeup', price: 1500 },
      { _id: 'br12', name: 'Party Makeup', price: 3000 },
      { _id: 'br13', name: 'Brides Maid Makeup', price: 5000 },
      { _id: 'br14', name: 'Saree Box Folding', price: 700 },
      { _id: 'br15', name: 'Fluffy Pleats', price: 1400 },
    ]
  },
  {
    category: 'Hair Filter (Nashi Argan)',
    services: [
      { _id: 'hf1', name: 'Express Filler Therapy', price: 1500 },
      { _id: 'hf2', name: 'Filler Therapy', price: 2500 },
      { _id: 'hf3', name: 'Dandruff Treatment', price: 1800 },
    ]
  },
  {
    category: 'Hair Spa (Loreal)',
    services: [
      { _id: 'hs1', name: 'Classic Spa', price: 1400 },
      { _id: 'hs2', name: 'Advanced Smoothing Spa', price: 2500 },
      { _id: 'hs3', name: 'Texture Spa', price: 1800 },
    ]
  },
  {
    category: 'Hair Colouring',
    services: [
      { _id: 'hc1', name: 'Global Color Basic Shade', price: 1500 },
      { _id: 'hc2', name: 'Grey Hair Coverage (Ammonia Free)', price: 3500 },
      { _id: 'hc3', name: 'Grey Hair Coverage', price: 2500 },
      { _id: 'hc4', name: 'Fashion Highlights (Starting)', price: 3500 },
    ]
  },
  {
    category: 'Cosmetic Enhancement',
    services: [
      { _id: 'ce1', name: 'Nose Piercing', price: 350 },
      { _id: 'ce2', name: 'Ear Piercing', price: 550 },
      { _id: 'ce3', name: 'Warts Removal (per wart)', price: 250 },
    ]
  },
  {
    category: 'Treatment',
    services: [
      { _id: 'tr1', name: 'Hairfall Treatment', price: 1500 },
      { _id: 'tr2', name: 'Dandruff Treatment', price: 1500 },
      { _id: 'tr3', name: 'Hair Smoothening', price: 4000 },
      { _id: 'tr4', name: 'Anti-Frizz Treatment', price: 5000 },
      { _id: 'tr_botox', name: 'Botox', options: [ { _id: 'tr5a', name: 'Starting', price: 6500 }, { _id: 'tr5b', name: 'Advanced', price: 8500 } ] },
      { _id: 'tr_straight', name: 'Hair Straightening', options: [ { _id: 'tr6a', name: 'Starting', price: 1000 }, { _id: 'tr6b', name: 'Advanced', price: 3000 } ] },
      { _id: 'tr7', name: 'Under Eye Treatment', price: 1000 },
    ]
  },
  {
    category: 'Waxing',
    services: [
      { _id: 'w_lip', name: 'Upper Lip', options: [ { _id: 'w1', name: 'Honey', price: 100 }, { _id: 'w2', name: 'Flavour', price: 200 }, { _id: 'w3', name: 'Stripless', price: 250 } ] },
      { _id: 'w_chin', name: 'Chin & Neck', options: [ { _id: 'w4', name: 'Honey', price: 110 }, { _id: 'w5', name: 'Flavour', price: 210 }, { _id: 'w6', name: 'Stripless', price: 350 } ] },
      { _id: 'w_side', name: 'Side', options: [ { _id: 'w7', name: 'Honey', price: 200 }, { _id: 'w8', name: 'Flavour', price: 350 }, { _id: 'w9', name: 'Stripless', price: 400 } ] },
      { _id: 'w_arm', name: 'Under Arm', options: [ { _id: 'w10', name: 'Honey', price: 200 }, { _id: 'w11', name: 'Flavour', price: 300 }, { _id: 'w12', name: 'Stripless', price: 500 } ] },
      { _id: 'w_tummy', name: 'Tummy', options: [ { _id: 'w13', name: 'Honey', price: 350 }, { _id: 'w14', name: 'Flavour', price: 450 }, { _id: 'w15', name: 'Stripless', price: 600 } ] },
      { _id: 'w_hand', name: 'Full Hand', options: [ { _id: 'w16', name: 'Honey', price: 800 }, { _id: 'w17', name: 'Flavour', price: 1000 }, { _id: 'w18', name: 'Rollon', price: 1200 } ] },
      { _id: 'w_legs', name: 'Full Legs', options: [ { _id: 'w19', name: 'Honey', price: 1000 }, { _id: 'w20', name: 'Flavour', price: 1400 }, { _id: 'w21', name: 'Rollon', price: 1600 } ] },
      { _id: 'w_body', name: 'Full Body', options: [ { _id: 'w22', name: 'Honey', price: 2000 }, { _id: 'w23', name: 'Flavour', price: 4000 } ] },
    ]
  },
  {
    category: 'Facial',
    services: [
      { _id: 'f1', name: 'Clean Up / Mini Facial', price: 750 },
      { _id: 'f2', name: 'Aroma Facial', price: 950 },
      { _id: 'f3', name: 'Vitamin C Papaya', price: 2500 },
      { _id: 'f4', name: 'Wine Facial', price: 2000 },
      { _id: 'f5', name: 'Diamond', price: 1900 },
      { _id: 'f6', name: 'Gold Glow', price: 2000 },
      { _id: 'f7', name: 'Charcoal', price: 2500 },
      { _id: 'f8', name: 'Anti Ageing', price: 1400 },
      { _id: 'f9', name: 'Bridal Glow', price: 3000 },
      { _id: 'f10', name: 'Hydra Facial', price: 3500 },
    ]
  },
  {
    category: 'Hair Cut',
    services: [
      { _id: 'hc_1', name: 'Straight Cut', price: 300 },
      { _id: 'hc_2', name: 'Baby Hair Cut', price: 300 },
      { _id: 'hc_3', name: 'Front Fringe Cut', price: 400 },
      { _id: 'hc_4', name: 'U Cut', price: 350 },
      { _id: 'hc_5', name: 'V Cut', price: 350 },
      { _id: 'hc_6', name: 'Advance Cuts', price: 800 },
      { _id: 'hc_7', name: 'Hair Wash', price: 350 },
      { _id: 'hc_8', name: 'Hair Setting', price: 600 },
      { _id: 'hc_9', name: 'Hair Wash with Conditioner (Loreal)', price: 400 },
      { _id: 'hc_10', name: 'Hair Service', price: 1500 },
    ]
  },
  {
    category: 'Massage',
    services: [
      { _id: 'ms1', name: 'Face Massage (15 mins)', price: 500 },
      { _id: 'ms2', name: 'Neck, Arms & Back Massage (15 mins)', price: 600 },
      { _id: 'ms3', name: 'Legs Massage', price: 700 },
      { _id: 'ms4', name: 'Full Body Moisturising (30 mins)', price: 3500 },
      { _id: 'ms5', name: 'Full Body with Oil (30 mins)', price: 2500 },
    ]
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/services');
    setServices(groupServicesByCategory(res.data));
  } catch (err) {
    console.error('Failed to fetch services', err);
  } finally {
    setLoading(false); // ✅ THIS FIXES LOADING ISSUE
  }
};
    fetchServices();
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleOptionChange = (serviceId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [serviceId]: optionId
    }));
  };

  const filteredCategories = services.map(cat => {
    const matchedServices = cat.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, services: matchedServices };
  }).filter(cat => cat.services.length > 0);

  const addToCart = (serviceItem) => {
    if (!cart.find(item => item._id === serviceItem._id)) {
      setCart([...cart, serviceItem]);
    }
  };

  const removeFromCart = (serviceId) => {
    setCart(cart.filter(item => item._id !== serviceId));
  };

  const subtotal = cart.reduce((acc, curr) => acc + curr.price, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleWhatsAppBooking = async () => {
    if (!bookingDate || !bookingTime || cart.length === 0) {
      alert('Please select services, date, and time before booking.');
      return;
    }

    try {
      // 1. Save the booking/bill to the backend
      const billPayload = {
        type: 'service',
        items: cart.map(item => ({ name: item.name, price: item.price, quantity: 1 })),
        subtotal,
        gst,
        total,
        customerDetails: {
          name: 'Online Service Booking',
          phone: '', // Phone would be gathered on WhatsApp
          date: bookingDate,
          time: bookingTime
        }
      };
      await axios.post('http://localhost:5000/api/billing', billPayload);
    } catch (error) {
      console.error("Failed to save booking to database", error);
    }

    // 2. Redirect to WhatsApp
    let message = `*New Service Booking*%0A%0A`;
    message += `*Date:* ${bookingDate}%0A`;
    message += `*Time:* ${bookingTime}%0A%0A`;
    message += `*Services Selected:*%0A`;
    cart.forEach(item => {
      message += `- ${item.name} (₹${item.price})%0A`;
    });
    message += `%0A*Subtotal:* ₹${subtotal}%0A`;
    message += `*GST (18%):* ₹${gst.toFixed(2)}%0A`;
    message += `*Total Amount:* ₹${total.toFixed(2)}%0A%0A`;
    message += `Please confirm my booking and send the QR code for payment.`;

    const whatsappNumber = '919876543210'; // Dummy number
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl heading-luxury text-gold-500 mb-4">Premium Services</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore our wide range of luxury treatments and book your appointment today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Services List Section */}
        <div className="lg:col-span-2">
          {/* Search Bar */}
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search services (e.g. Facial, Waxing)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <div key={category.category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => toggleCategory(category.category)}
                    className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900 uppercase tracking-wider">{category.category}</span>
                    {expandedCategory === category.category ? <ChevronUp className="text-gold-500" /> : <ChevronDown className="text-gray-400" />}
                  </button>

                  {expandedCategory === category.category && (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border-t border-gray-100">
                      {category.services.map(service => {
                       const isDropdown = Array.isArray(service.options) && service.options.length > 0;
                        const activeOptionId = isDropdown
  ? (selectedOptions[service._id] || service.options?.[0]?._id)
  : null;
                        const activeOption = isDropdown
  ? service.options?.find(opt => opt._id === activeOptionId)
  : null;
                          
                        const priceToDisplay = isDropdown && activeOption
  ? activeOption.price
  : service.price;
                        
                        const cartItem = isDropdown 
                          ? { _id: activeOption._id, name: `${service.name} - ${activeOption.name}`, price: activeOption.price, category: category.category }
                          : { _id: service._id, name: service.name, price: service.price, category: category.category };

                        return (
                          <div key={service._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <span className="text-xs font-semibold text-gold-500 tracking-wider uppercase mb-1 block">{category.category}</span>
                                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                </div>
                                <span className="text-xl font-serif text-black min-w-max ml-4">₹{priceToDisplay}</span>
                              </div>
                              
                              {isDropdown && service.options?.length > 0 && (
                                <div className="mb-4">
                                  <select 
                                    value={activeOptionId}
                                    onChange={(e) => handleOptionChange(service._id, e.target.value)}
                                    className="w-full p-2.5 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm text-gray-700 bg-gray-50"
                                  >
                                    {service.options.map(opt => (
                                      <option key={opt._id} value={opt._id}>
                                        {opt.name} - ₹{opt.price}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            
                            <button 
                              onClick={() => addToCart(cartItem)}
                              disabled={cart.find(item => item._id === cartItem._id)}
                              className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors mt-auto ${
                                cart.find(item => item._id === cartItem._id) 
                                  ? 'bg-green-50 text-green-700 border border-green-200'
                                  : 'bg-black text-white hover:bg-gold-500 hover:text-black'
                              }`}
                            >
                              {cart.find(item => item._id === cartItem._id) ? (
                                <><Check size={18} /> Added to Cart</>
                              ) : (
                                <><ShoppingCart size={18} /> Add to Cart</>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking & Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <h2 className="text-2xl heading-luxury mb-6 border-b border-gray-100 pb-4">Your Booking</h2>
            
            {/* Date & Time Selection */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-gray-700"
                  />
                  <Calendar className="absolute left-3 top-3 text-gold-500" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                <div className="relative">
                  <input 
                    type="time" 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-gray-700"
                  />
                  <Clock className="absolute left-3 top-3 text-gold-500" size={18} />
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Selected Services</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm italic text-center py-4 bg-gray-50 rounded-lg">No services selected.</p>
              ) : (
                <ul className="space-y-3">
                  {cart.map(item => (
                    <li key={item._id} className="flex justify-between items-center group text-sm">
                      <div className="flex-1">
                        <span className="block font-medium text-gray-900">{item.name}</span>
                        <span className="text-gray-500">₹{item.price}</span>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Bill Summary */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span className="text-gold-500">₹{total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* WhatsApp Checkout Button */}
            <button 
              onClick={handleWhatsAppBooking}
              disabled={cart.length === 0}
              className={`w-full py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                cart.length > 0 
                  ? 'bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md hover:shadow-lg' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <MessageCircle size={20} />
              Book via WhatsApp
            </button>
            <p className="text-xs text-center text-gray-500 mt-3">
              You will be redirected to our WhatsApp Chatbot to receive your payment QR code.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
