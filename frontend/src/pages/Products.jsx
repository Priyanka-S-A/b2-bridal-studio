import React, { useState } from 'react';
import { ShoppingBag, Check, Trash2, MessageCircle } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Gold Radiance Face Cream', price: 1500, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80' },
  { id: '2', name: 'Herbal Hair Oil Extract', price: 800, image: 'https://images.unsplash.com/photo-1608248593842-8d7d912953f4?auto=format&fit=crop&w=300&q=80' },
  { id: '3', name: 'Luxury Matte Lipstick - Crimson', price: 1200, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80' },
  { id: '4', name: 'Vitamin C Brightening Serum', price: 2000, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=300&q=80' },
];

const Products = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handleWhatsAppBooking = () => {
    let message = `*New Product Order*%0A%0A*Items Selected:*%0A`;
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})%0A`;
    });
    message += `%0A*Subtotal:* ₹${subtotal}%0A`;
    message += `*GST (18%):* ₹${gst.toFixed(2)}%0A`;
    message += `*Total Amount:* ₹${total.toFixed(2)}%0A%0A`;
    message += `Please confirm my order and send the QR code for payment.`;

    const whatsappNumber = '919876543210';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl heading-luxury text-gold-500 mb-4">Exclusive Products</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Shop our premium range of beauty and skincare products used by our experts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Products Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DUMMY_PRODUCTS.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-serif text-gold-500 font-bold">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-black text-white p-2.5 rounded-full hover:bg-gold-500 hover:text-black transition-colors"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <h2 className="text-2xl heading-luxury mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
              <ShoppingBag className="text-gold-500" /> Your Cart
            </h2>
            
            <div className="mb-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm italic text-center py-8 bg-gray-50 rounded-lg">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between items-center group text-sm border-b border-gray-50 pb-3 last:border-0">
                      <div className="flex-1 pr-4">
                        <span className="block font-medium text-gray-900 line-clamp-1">{item.name}</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500">{item.quantity} x ₹{item.price}</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-1 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <>
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

                <button 
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle size={20} /> Checkout via WhatsApp
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Complete your purchase securely via WhatsApp.
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;
